#!/usr/bin/env bash
# KARGANOT Production Server Setup - Ubuntu 22.04
# Next.js (web) + NestJS (api) + PostgreSQL + Nginx + SSL (Certbot) + Docker Compose

set -euo pipefail

#=========================
# Configuration
#=========================
export DEBIAN_FRONTEND=noninteractive

DOMAIN_MAIN="karganot.com"
DOMAIN_API="api.karganot.com"
EMAIL_ACME="admin@karganot.com"

REPO_URL="https://github.com/karganot/app.git"
REPO_DIR="/opt/karganot"
COMPOSE_FILE="docker-compose.prod.yml"

LOG_FILE="/var/log/karganot-setup.log"

DB_NAME="karganot_prod"
DB_USER="karganot_admin"
DB_PASS="Karganot!2025"

NGINX_SITE="/etc/nginx/sites-available/karganot.conf"
NGINX_SITE_LINK="/etc/nginx/sites-enabled/karganot.conf"
ACME_WEBROOT="/var/www/certbot"
SYSTEMD_UNIT="/etc/systemd/system/karganot.service"

# Colors
GREEN="\033[1;32m"; YELLOW="\033[1;33m"; RED="\033[1;31m"; BLUE="\033[1;34m"; NC="\033[0m"

#=========================
# Logging
#=========================
mkdir -p "$(dirname "$LOG_FILE")"
touch "$LOG_FILE"
chmod 0644 "$LOG_FILE"
exec > >(tee -a "$LOG_FILE") 2>&1

#=========================
# Root check
#=========================
if [ "${EUID:-$(id -u)}" -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Script root olarak çalıştırılmalıdır."; exit 1;
fi

echo -e "${BLUE}[INSTALL]${NC} KARGANOT production kurulum başlıyor..."

#=========================
# System update & dependencies
#=========================
echo -e "${BLUE}[INSTALL]${NC} Sistem güncelleme ve bağımlılıklar..."
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git ca-certificates apt-transport-https software-properties-common lsb-release gnupg
apt-get install -y ufw nginx
# Docker Engine + Compose
if ! command -v docker >/dev/null 2>&1; then
  echo -e "${YELLOW}[INFO]${NC} Docker (repo) kuruluyor..."
  if apt-get install -y docker.io docker-compose-plugin; then
    echo -e "${GREEN}[OK]${NC} Docker paketleri (Ubuntu repo) kuruldu."
  else
    echo -e "${YELLOW}[WARN]${NC} Ubuntu reposundan kurulum başarısız; resmi Docker deposuna düşülüyor."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable" > /etc/apt/sources.list.d/docker.list
    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  fi
else
  echo -e "${YELLOW}[INFO]${NC} Docker zaten kurulu, adım atlanıyor."
fi
systemctl enable --now docker || true

# Node.js 20 + npm
if ! command -v node >/dev/null 2>&1 || ! node -v | grep -qE '^v20\.'; then
  echo -e "${YELLOW}[INFO]${NC} Node.js 20 kuruluyor..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# Certbot
apt-get install -y certbot python3-certbot-nginx

echo -e "${GREEN}[OK]${NC} Sistem bağımlılıkları hazır."

#=========================
# Firewall (UFW)
#=========================
echo -e "${BLUE}[CONFIG]${NC} UFW yapılandırılıyor..."
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw default deny incoming || true
ufw default allow outgoing || true
ufw allow 'Nginx Full' || true
echo "y" | ufw enable || true
echo -e "${GREEN}[OK]${NC} Firewall etkin."

#=========================
# PostgreSQL
#=========================
echo -e "${BLUE}[INSTALL]${NC} PostgreSQL kuruluyor..."
apt-get install -y postgresql postgresql-contrib
systemctl enable --now postgresql

sudo -u postgres psql <<'SQL'
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
      CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASS}';
   END IF;
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}') THEN
      CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
   END IF;
END
$$;
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL
echo -e "${GREEN}[OK]${NC} PostgreSQL hazır: DB=${DB_NAME}, USER=${DB_USER}"

#=========================
# Clone or update repo
#=========================
echo -e "${BLUE}[INSTALL]${NC} Uygulama deposu hazırlanıyor..."
set +e
if [ -d "$REPO_DIR/.git" ]; then
  git -C "$REPO_DIR" fetch --all --prune
  git -C "$REPO_DIR" reset --hard origin/main || git -C "$REPO_DIR" pull
else
  mkdir -p "$REPO_DIR"
  git clone "$REPO_URL" "$REPO_DIR"
fi
GIT_STATUS=$?
set -e
if [ "$GIT_STATUS" -ne 0 ] || [ ! -d "$REPO_DIR/.git" ]; then
  echo -e "${YELLOW}[WARN]${NC} Repo klonlanamadı (özel repo olabilir). Compose adımı atlanabilir."
fi
echo -e "${GREEN}[OK]${NC} Repo hazır: $REPO_DIR"

#=========================
# Nginx config (HTTP pre-SSL)
#=========================
echo -e "${BLUE}[CONFIG]${NC} Nginx HTTP konfigürasyonu uygulanıyor..."
mkdir -p "$ACME_WEBROOT"
if [ -L /etc/nginx/sites-enabled/default ]; then rm -f /etc/nginx/sites-enabled/default; fi
cat > "$NGINX_SITE" <<'NGX'
server {
  listen 80;
  listen [::]:80;
  server_name karganot.com www.karganot.com api.karganot.com;

  location /.well-known/acme-challenge/ { root /var/www/certbot; }

  location /api/ {
    proxy_pass http://api:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    proxy_pass http://web:3001/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
NGX

ln -sf "$NGINX_SITE" "$NGINX_SITE_LINK"
nginx -t
systemctl reload nginx
echo -e "${GREEN}[OK]${NC} Nginx HTTP aktif."

#=========================
# Docker Compose build & up
#=========================
echo -e "${BLUE}[DEPLOY]${NC} Docker Compose build & up..."
if [ -d "$REPO_DIR" ] && [ -f "$REPO_DIR/$COMPOSE_FILE" ]; then
  cd "$REPO_DIR"
  docker compose -f "$COMPOSE_FILE" up -d --build || true
else
  echo -e "${YELLOW}[WARN]${NC} Compose dosyası yok; Docker build aşaması atlanıyor."
fi
echo -e "${GREEN}[OK]${NC} Docker servisleri çalışıyor."

#=========================
# SSL (Certbot)
#=========================
echo -e "${BLUE}[CONFIG]${NC} SSL sertifikaları alınıyor..."
CERT_PATH="/etc/letsencrypt/live/${DOMAIN_MAIN}/fullchain.pem"
KEY_PATH="/etc/letsencrypt/live/${DOMAIN_MAIN}/privkey.pem"

if [ ! -f "$CERT_PATH" ] || [ ! -f "$KEY_PATH" ]; then
  certbot --nginx -d "$DOMAIN_MAIN" -d "www.${DOMAIN_MAIN}" -d "$DOMAIN_API" --non-interactive --agree-tos -m "$EMAIL_ACME" || true
fi

if [ -f "$CERT_PATH" ] && [ -f "$KEY_PATH" ]; then
  echo -e "${GREEN}[OK]${NC} SSL alındı; HTTPS konfigürasyonu yazılıyor."
  cat > "$NGINX_SITE" <<NGX
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN_MAIN} www.${DOMAIN_MAIN} ${DOMAIN_API};
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  return 301 https://\$host\$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${DOMAIN_MAIN} www.${DOMAIN_MAIN};
  ssl_certificate ${CERT_PATH};
  ssl_certificate_key ${KEY_PATH};
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  location /api/ {
    proxy_pass http://api:3000/;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
  location / {
    proxy_pass http://web:3001/;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${DOMAIN_API};
  ssl_certificate ${CERT_PATH};
  ssl_certificate_key ${KEY_PATH};
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  location / {
    proxy_pass http://api:3000/;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
NGX
  nginx -t && systemctl reload nginx
else
  echo -e "${YELLOW}[WARN]${NC} SSL alınamadı. DNS/80-443 erişimini doğrulayın."
fi

#=========================
# Cron (health + SSL renew)
#=========================
echo -e "${BLUE}[CONFIG]${NC} Cron görevleri ekleniyor..."
CRONTAB_TMP="$(mktemp)"
crontab -l 2>/dev/null | grep -v "health-autocheck.sh" | grep -v "certbot renew" > "$CRONTAB_TMP" || true

mkdir -p /root/scripts
if [ -f "$REPO_DIR/scripts/health-autocheck.sh" ]; then
  cp -f "$REPO_DIR/scripts/health-autocheck.sh" /root/scripts/health-autocheck.sh
  chmod +x /root/scripts/health-autocheck.sh
else
  cat > /root/scripts/health-autocheck.sh <<'HS'
#!/usr/bin/env bash
set -euo pipefail
URL="https://api.karganot.com/api/health"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo 000)
if [ "$STATUS" != "200" ]; then
  echo "$(date) ❌ API Down! Restarting..." >> /var/log/karganot-health.log
  docker compose -f /opt/karganot/docker-compose.prod.yml restart api || true
else
  echo "$(date) ✅ API OK" >> /var/log/karganot-health.log
fi
HS
  chmod +x /root/scripts/health-autocheck.sh
fi

echo "*/15 * * * * bash /root/scripts/health-autocheck.sh" >> "$CRONTAB_TMP"
echo "0 3 * * * certbot renew --quiet && (docker exec nginx nginx -s reload 2>/dev/null || systemctl reload nginx)" >> "$CRONTAB_TMP"
crontab "$CRONTAB_TMP" && rm -f "$CRONTAB_TMP"
echo -e "${GREEN}[OK]${NC} Cron görevleri yüklendi."

#=========================
# Systemd unit (compose up on boot)
#=========================
echo -e "${BLUE}[CONFIG]${NC} Systemd servis oluşturuluyor..."
cat > "$SYSTEMD_UNIT" <<UNIT
[Unit]
Description=KARGANOT Docker Compose App
Requires=docker.service network-online.target
After=docker.service network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${REPO_DIR}
ExecStart=/usr/bin/docker compose -f ${COMPOSE_FILE} up -d
ExecStop=/usr/bin/docker compose -f ${COMPOSE_FILE} down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable karganot.service
echo -e "${GREEN}[OK]${NC} Systemd servis aktif (karganot.service)."

#=========================
# Final
#=========================
echo -e "${GREEN}✅ KARGANOT production environment successfully deployed!${NC}"
echo -e "${BLUE}Log dosyası:${NC} $LOG_FILE"
echo -e "${YELLOW}Not:${NC} DNS A kayıtları ${DOMAIN_MAIN}, www.${DOMAIN_MAIN}, ${DOMAIN_API} için aynı public IP’ye işaret etmelidir."
