#!/usr/bin/env bash
set -euo pipefail

# KARGANOT: One-command deployer for GoDaddy VPS (Ubuntu 22.04)
# Usage:
#   bash scripts/deploy/deploy-to-godaddy.sh
# Configurable vars
HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"root"}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
REMOTE_BASE=${REMOTE_BASE:-"/var/www/karganot"}
API_DIR="$REMOTE_BASE/api"
WEB_DIR="$REMOTE_BASE/web"
LOG_DIR="$REMOTE_BASE/logs"

# Optional: local build prior to deploy
LOCAL_WEB_DIR="/Users/onurcangunel/Desktop/KARGANOT/apps/web"
LOCAL_API_DIR="/Users/onurcangunel/Desktop/KARGANOT/apps/api"

# SSH helper
ssh_exec() { ssh -o StrictHostKeyChecking=no "$USER@$HOST" "$@"; }

echo "🚀 Connecting to $USER@$HOST and preparing server..."
ssh_exec "bash -lc 'set -e; \
  apt update -y && apt upgrade -y; \
  apt install -y curl git ufw nginx certbot python3-certbot-nginx; \
  if ! command -v node >/dev/null 2>&1; then \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs; \
  fi; \
  node -v; npm -v; \
  mkdir -p $REMOTE_BASE && chmod -R 755 $REMOTE_BASE; \
  mkdir -p $API_DIR $WEB_DIR $LOG_DIR; \
'"

# Rsync project subfolders (api & web) to server, excluding dev files
echo "📦 Syncing project to server..."
rsync -az --delete --exclude node_modules --exclude .next \
  /Users/onurcangunel/Desktop/KARGANOT/apps/api/ "$USER@$HOST:$API_DIR/"
rsync -az --delete --exclude node_modules --exclude .next \
  /Users/onurcangunel/Desktop/KARGANOT/apps/web/ "$USER@$HOST:$WEB_DIR/"

# Remote: install & run API
echo "⚙️ Installing API and starting with PM2..."
ssh_exec "bash -lc 'set -e; cd $API_DIR; \
  npm install --legacy-peer-deps; \
  npx prisma generate; \
  npx prisma migrate deploy; \
  npm run build; \
  npm i -g pm2; \
  pm2 start dist/main.js --name karganot-api || pm2 restart karganot-api; \
  pm2 save; \
'"

# Remote: install & run Web
echo "🖥️ Installing Web and starting with PM2..."
ssh_exec "bash -lc 'set -e; cd $WEB_DIR; \
  npm install --legacy-peer-deps; \
  npm run build; \
  pm2 start \"npm run start\" --name karganot-web || pm2 restart karganot-web; \
  pm2 save; \
'"

# Nginx config
NGINX_CONF="/etc/nginx/sites-available/karganot.conf"
NGINX_BLOCK=$(cat <<'CONF'
server {
    listen 80;
    server_name karganot.com www.karganot.com;

    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
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

# Apply Nginx config and SSL
echo "🔐 Configuring Nginx and SSL..."
ssh_exec "bash -lc 'set -e; \
  rm -f /etc/nginx/sites-enabled/default || true; \
  echo "$NGINX_BLOCK" > $NGINX_CONF; \
  ln -sf $NGINX_CONF /etc/nginx/sites-enabled/karganot.conf; \
  nginx -t; systemctl reload nginx; \
  if ! command -v certbot >/dev/null 2>&1; then apt install -y certbot python3-certbot-nginx; fi; \
  certbot --nginx -d karganot.com -d www.karganot.com --non-interactive --agree-tos -m $EMAIL || true; \
  systemctl enable certbot.timer || true; \
'"

# UFW
echo "🛡️ Configuring UFW..."
ssh_exec "bash -lc 'set -e; \
  ufw allow OpenSSH; ufw allow 80; ufw allow 443; \
  yes | ufw enable || true; \
'"

# Verify
echo "🧪 Verifying deployment..."
ssh_exec "bash -lc 'set -e; \
  API_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://karganot.com/api/v1/health || true); \
  WEB_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://karganot.com || true); \
  DIG=\$(dig +short karganot.com || true); \
  echo "Nginx: \$(systemctl is-active nginx)" > $LOG_DIR/deploy-report.txt; \
  echo "PM2: \$(pm2 status | head -n 5)" >> $LOG_DIR/deploy-report.txt; \
  echo "Domain IP: $DIG" >> $LOG_DIR/deploy-report.txt; \
  echo "API /health: $API_STATUS" >> $LOG_DIR/deploy-report.txt; \
  echo "Web /: $WEB_STATUS" >> $LOG_DIR/deploy-report.txt; \
  cat $LOG_DIR/deploy-report.txt; \
'"

echo "✅ Done. If DNS is correct and services started, site should be live at https://$DOMAIN"
