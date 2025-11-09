#!/usr/bin/env bash
set -euo pipefail
# Basit KARGANOT deploy (sshpass + heredoc), okumaya kolay.
: "Gereken env değişkenleri: PASSWORD HOST USER DOMAIN EMAIL"

HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"karganot"}
PASSWORD=${PASSWORD:-""}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
REMOTE_BASE=${REMOTE_BASE:-"/var/www/karganot"}
API_DIR="$REMOTE_BASE/api"
WEB_DIR="$REMOTE_BASE/web"
LOG_DIR="$REMOTE_BASE/logs"
DB_URL=${REMOTE_DB_URL:-"postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public"}
API_PORT=${API_PORT:-3000}
WEB_PORT=${WEB_PORT:-3024}

if [ -z "$PASSWORD" ]; then echo "PASSWORD eksik" >&2; exit 1; fi
if ! command -v sshpass >/dev/null 2>&1; then echo "sshpass yok -> brew install hudochenkov/sshpass/sshpass" >&2; exit 1; fi

SSHP="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USER@$HOST"

echo "🚀 Sunucu hazırlığı..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx postgresql postgresql-contrib
if ! command -v node >/dev/null 2>&1; then curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs; fi
sudo systemctl enable postgresql || true
REMOTE

echo "🗄️ PostgreSQL kullanıcı/db oluşturma..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='karganot'" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE karganot LOGIN PASSWORD 'karganot123';"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='karganot'" | grep -q 1 || sudo -u postgres createdb -O karganot karganot
REMOTE

echo "📂 Dizimler..."
$SSHP bash -s <<REMOTE
set -euo pipefail
sudo mkdir -p "$REMOTE_BASE" "$API_DIR" "$WEB_DIR" "$LOG_DIR"
sudo chown -R "$USER:$USER" "$REMOTE_BASE"
REMOTE

echo "📦 API ve Web rsync..."
sshpass -p "$PASSWORD" rsync -az --delete --exclude node_modules --exclude .next -e "ssh -o StrictHostKeyChecking=no" /Users/onurcangunel/Desktop/KARGANOT/apps/api/ "$USER@$HOST:$API_DIR/"
sshpass -p "$PASSWORD" rsync -az --delete --exclude node_modules --exclude .next -e "ssh -o StrictHostKeyChecking=no" /Users/onurcangunel/Desktop/KARGANOT/apps/web/ "$USER@$HOST:$WEB_DIR/"

echo "🔎 Rsync doğrulama listesi (ilk 10 dosya)..."
$SSHP bash -s <<REMOTE
set -euo pipefail
echo "API içeriği:"; ls -1 "$API_DIR" | head -n 10 || true
echo "WEB içeriği:"; ls -1 "$WEB_DIR" | head -n 10 || true
REMOTE

JWT_SECRET=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 48)

echo "📝 .env dosyaları..."
$SSHP bash -s <<REMOTE
cat > "$API_DIR/.env" <<EOF
PORT=$API_PORT
DATABASE_URL=$DB_URL
JWT_SECRET=$JWT_SECRET
FRONTEND_URL=https://$DOMAIN
EOF

cat > "$WEB_DIR/.env.production" <<EOF
NEXT_PUBLIC_API_URL=https://$DOMAIN/api
NEXTAUTH_URL=https://$DOMAIN
NODE_ENV=production
PORT=$WEB_PORT
EOF
REMOTE

echo "⚙️ API install/build/PM2..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
cd /var/www/karganot/api
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate deploy || true
npm run build
sudo npm i -g pm2
pm2 start dist/main.js --name karganot-api --time || pm2 restart karganot-api
pm2 save
REMOTE

echo "🖥️ Web install/build/PM2..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
cd /var/www/karganot/web
npm install --legacy-peer-deps
npm run build
pm2 start "npm run start" --name karganot-web --time || pm2 restart karganot-web
pm2 save
REMOTE

echo "🔐 Nginx + SSL..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
sudo tee /etc/nginx/sites-available/karganot.conf >/dev/null <<'CONF'
server {
  listen 80;
  server_name karganot.com www.karganot.com;
  location /api/ { proxy_pass http://127.0.0.1:3000/; proxy_set_header Host $host; }
  location / { proxy_pass http://127.0.0.1:3024; proxy_set_header Host $host; }
}
CONF
sudo rm -f /etc/nginx/sites-enabled/default || true
sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d karganot.com -d www.karganot.com --non-interactive --agree-tos -m onurcangunel@icloud.com || true
sudo systemctl enable certbot.timer || true
REMOTE

echo "🛡️ UFW..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
yes | sudo ufw enable || true
REMOTE

echo "🧪 Doğrulama..."
$SSHP bash -s <<'REMOTE'
set -euo pipefail
API_CODE=$(curl -s -o /dev/null -w '%{http_code}' https://karganot.com/api/v1/health || true)
WEB_CODE=$(curl -s -o /dev/null -w '%{http_code}' https://karganot.com || true)
DIG_IP=$(dig +short karganot.com || true)
cat > /var/www/karganot/logs/deploy-report.txt <<EOF
Nginx: $(systemctl is-active nginx)
PM2:
$(pm2 status | head -n 10)
Domain IP: $DIG_IP
API /health: $API_CODE
Web /: $WEB_CODE
EOF
cat /var/www/karganot/logs/deploy-report.txt
REMOTE

echo "✅ Tamamlandı. DNS hazırsa https://$DOMAIN yayında olacaktır."
