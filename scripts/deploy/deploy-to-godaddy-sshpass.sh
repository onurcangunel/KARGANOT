#!/usr/bin/env bash
set -euo pipefail

# KARGANOT: Password-based fully automated deployer for GoDaddy VPS (Ubuntu 22.04)
# Usage example:
#   PASSWORD='Karganot!2025' HOST=46.252.192.249 USER=karganot DOMAIN=karganot.com EMAIL=onurcangunel@gmail.com \
#     bash scripts/deploy/deploy-to-godaddy-sshpass.sh

HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"karganot"}
PASSWORD=${PASSWORD:-""}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
REMOTE_BASE=${REMOTE_BASE:-"/var/www/karganot"}
API_DIR="$REMOTE_BASE/api"
WEB_DIR="$REMOTE_BASE/web"
LOG_DIR="$REMOTE_BASE/logs"
INSTALL_POSTGRES=${INSTALL_POSTGRES:-"auto"} # auto|true|false
REMOTE_DB_URL=${REMOTE_DB_URL:-""}
API_PORT=${API_PORT:-3000}
WEB_PORT=${WEB_PORT:-3024}

if [ -z "$PASSWORD" ]; then
  echo "ERROR: Set PASSWORD env var for sshpass." >&2
  exit 1
fi

# Ensure sshpass exists (macOS Homebrew)
if ! command -v sshpass >/dev/null 2>&1; then
  echo "Installing sshpass (requires Homebrew)..."
  if command -v brew >/dev/null 2>&1; then
    brew install hudochenkov/sshpass/sshpass || brew install esolitos/ipa/sshpass
  else
    echo "ERROR: Homebrew not found. Install Homebrew or install sshpass manually." >&2
    exit 1
  fi
fi

SSHP="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no"
RSYNC_SSH="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no"

# Prepare server (packages + Node.js + dirs)
echo "🚀 Preparing server $USER@$HOST ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  sudo apt update -y && sudo apt upgrade -y; \
  sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx; \
  if ! command -v node >/dev/null 2>&1; then \
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs; \
  fi; \
  node -v; npm -v; \
  sudo mkdir -p $REMOTE_BASE $API_DIR $WEB_DIR $LOG_DIR; \
  sudo chown -R $USER:$USER $REMOTE_BASE; \
'"'"

# PostgreSQL (optional)
if [ "$INSTALL_POSTGRES" = "true" ] || { [ "$INSTALL_POSTGRES" = "auto" ] && [ -z "$REMOTE_DB_URL" ]; }; then
  echo "🗄️ Installing PostgreSQL and creating database/user..."
  $SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
    if ! command -v psql >/dev/null 2>&1; then \
      sudo apt install -y postgresql postgresql-contrib; \
    fi; \
    sudo -u postgres psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='karganot'\" | grep -q 1 || \
      sudo -u postgres psql -c \"CREATE ROLE karganot LOGIN PASSWORD 'karganot123';\"; \
    sudo -u postgres psql -tc \"SELECT 1 FROM pg_database WHERE datname='karganot'\" | grep -q 1 || \
      sudo -u postgres createdb -O karganot karganot; \
  '"'"
  REMOTE_DB_URL="postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public"
fi

# Sync project (api & web)
echo "📦 Rsync project to server..."
rsync -az --delete --exclude node_modules --exclude .next -e "$RSYNC_SSH" \
  /Users/onurcangunel/Desktop/KARGANOT/apps/api/ "$USER@$HOST:$API_DIR/"
rsync -az --delete --exclude node_modules --exclude .next -e "$RSYNC_SSH" \
  /Users/onurcangunel/Desktop/KARGANOT/apps/web/ "$USER@$HOST:$WEB_DIR/"

# Create API .env
API_ENV_CONTENT=$(cat <<EOF
PORT=$API_PORT
DATABASE_URL=${REMOTE_DB_URL}
JWT_SECRET=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 48)
FRONTEND_URL=https://$DOMAIN
PYTHON_API_URL=http://127.0.0.1:8000
EOF
)

echo "📝 Creating API .env ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  cat > $API_DIR/.env <<ENV
$API_ENV_CONTENT
ENV
'"'"

# Create Web .env.production (use path-based API)
WEB_ENV_CONTENT=$(cat <<EOF
NEXT_PUBLIC_API_URL=https://$DOMAIN/api
NEXTAUTH_URL=https://$DOMAIN
NODE_ENV=production
PORT=$WEB_PORT
EOF
)

echo "📝 Creating Web .env.production ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  cat > $WEB_DIR/.env.production <<ENV
$WEB_ENV_CONTENT
ENV
'"'"

# Install & run API with PM2
echo "⚙️ Install API deps and start..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; cd $API_DIR; \
  npm install --legacy-peer-deps; \
  npx prisma generate; \
  npx prisma migrate deploy || true; \
  npm run build; \
  sudo npm i -g pm2; \
  # Start correct entry for NestJS (dist/src/main.js)
  pm2 start dist/src/main.js --name karganot-api --time || pm2 restart karganot-api; \
  pm2 save; \
'"'"

# Install & run Web with PM2
echo "🖥️ Install Web deps and start..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; cd $WEB_DIR; \
  npm install --legacy-peer-deps; \
  npm run build; \
  # Start Next.js production server on 127.0.0.1:3024 explicitly
  pm2 start ./node_modules/next/dist/bin/next --name karganot-web -- start -H 127.0.0.1 -p ${WEB_PORT}; \
  pm2 restart karganot-web || true; \
  pm2 save; \
'"'"

# Nginx config
NGINX_CONF_CONTENT=$(cat <<'CONF'
server {
  listen 80;
  server_name karganot.com www.karganot.com;

  # Preserve /api prefix to match Nest global prefix 'api/v1'
  location /api/ {
    proxy_pass http://127.0.0.1:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    proxy_pass http://127.0.0.1:3024;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
CONF
)

echo "🔐 Configure Nginx + SSL ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  echo "$NGINX_CONF_CONTENT" | sudo tee /etc/nginx/sites-available/karganot.conf >/dev/null; \
  sudo rm -f /etc/nginx/sites-enabled/default || true; \
  sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf; \
  sudo nginx -t; sudo systemctl reload nginx; \
  if ! command -v certbot >/dev/null 2>&1; then sudo apt install -y certbot python3-certbot-nginx; fi; \
  sudo certbot --nginx -d karganot.com -d www.karganot.com --non-interactive --agree-tos -m $EMAIL || true; \
  sudo systemctl enable certbot.timer || true; \
'"'"

# UFW
echo "🛡️ Configure UFW ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  sudo ufw allow OpenSSH; sudo ufw allow 80; sudo ufw allow 443; \
  yes | sudo ufw enable || true; \
'"'"

# Verify & report
echo "🧪 Verify and report ..."
$SSHP "$USER@$HOST" bash -lc "'"'"set -e; \
  API_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/api/v1/health || true); \
  WEB_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN || true); \
  DIG=\$(dig +short $DOMAIN || true); \
  mkdir -p $LOG_DIR; \
  echo \"Nginx: \$(systemctl is-active nginx)\" > $LOG_DIR/deploy-report.txt; \
  echo \"PM2: \$(pm2 status | head -n 10)\" >> $LOG_DIR/deploy-report.txt; \
  echo \"Domain IP: $DIG\" >> $LOG_DIR/deploy-report.txt; \
  echo \"API /health: $API_STATUS\" >> $LOG_DIR/deploy-report.txt; \
  echo \"Web /: $WEB_STATUS\" >> $LOG_DIR/deploy-report.txt; \
  cat $LOG_DIR/deploy-report.txt; \
'"'"

echo "✅ Deployment flow completed. DNS yayılımı tamamlandığında https://$DOMAIN üzerinden erişilebilir olmalı."
