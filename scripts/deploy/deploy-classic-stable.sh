#!/usr/bin/env bash
set -euo pipefail

HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"karganot"}
PASSWORD=${PASSWORD:-""}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
API_PORT=${API_PORT:-3000}
WEB_PORT=${WEB_PORT:-3024}
REMOTE_BASE=/var/www/karganot
API_DIR=$REMOTE_BASE/api
WEB_DIR=$REMOTE_BASE/web
LOG_DIR=$REMOTE_BASE/logs

if [ -z "$PASSWORD" ]; then echo "Set PASSWORD"; exit 1; fi

SSHP="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no"
RSYNC="sshpass -p $PASSWORD rsync -az --delete --exclude node_modules --exclude .next --exclude dist"

echo "[1/8] Sync project (api & web)";
$SSHP $USER@$HOST "mkdir -p $API_DIR $WEB_DIR $LOG_DIR"
$RSYNC /Users/onurcangunel/Desktop/KARGANOT/apps/api/ $USER@$HOST:$API_DIR/
$RSYNC /Users/onurcangunel/Desktop/KARGANOT/apps/web/ $USER@$HOST:$WEB_DIR/

echo "[2/8] Server packages & Node.js";
$SSHP $USER@$HOST bash -lc "set -e; sudo apt update -y; sudo apt install -y curl git nginx certbot python3-certbot-nginx ufw jq; if ! command -v node >/dev/null 2>&1; then curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs; fi; node -v; npm -v; sudo npm i -g pm2;"

echo "[3/8] API env & install & build";
API_ENV_CONTENT="PORT=$API_PORT\nDATABASE_URL=${DATABASE_URL:-}\nJWT_SECRET=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 48)\nFRONTEND_URL=https://$DOMAIN\nPYTHON_API_URL=http://127.0.0.1:8000"
$SSHP $USER@$HOST bash -lc "printf '%s\n' '$API_ENV_CONTENT' > $API_DIR/.env"
$SSHP $USER@$HOST bash -lc "set -e; cd $API_DIR; npm install --legacy-peer-deps; if [ -n '${DATABASE_URL:-}' ]; then npx prisma generate || true; npx prisma migrate deploy || true; else echo 'DATABASE_URL boş -> prisma adımları atlandı'; fi; npm run build; pm2 delete karganot-api || true; PORT=$API_PORT pm2 start dist/src/main.js --name karganot-api --time;"

echo "[4/8] WEB env & install & build";
WEB_ENV_CONTENT="NEXT_PUBLIC_API_URL=https://$DOMAIN/api\nNEXTAUTH_URL=https://$DOMAIN\nNODE_ENV=production\nPORT=$WEB_PORT"
$SSHP $USER@$HOST bash -lc "printf '%s\n' '$WEB_ENV_CONTENT' > $WEB_DIR/.env.production"
# Duplicate route temizleme (parantezli klasör ismi quote içinde)
$SSHP $USER@$HOST bash -lc "set -e; cd $WEB_DIR; rm -rf 'src/app/(pages)/ucretlendirme' || true; npm install --legacy-peer-deps; npm run build; pm2 delete karganot-web || true; pm2 start ./node_modules/next/dist/bin/next --name karganot-web -- start -H 127.0.0.1 -p $WEB_PORT --hostname 127.0.0.1;"

echo "[5/8] PM2 save & startup";
$SSHP $USER@$HOST bash -lc "pm2 save; pm2 startup systemd -u $USER --hp /home/$USER || true"

echo "[6/8] Nginx configure & reload";
NGINX_CONF=$(cat <<'CONF'
server {
  listen 80;
  server_name karganot.com www.karganot.com;
  location /api/ {
    proxy_pass http://127.0.0.1:3000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  location / {
    proxy_pass http://127.0.0.1:3024;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
CONF
)
$SSHP $USER@$HOST bash -lc "echo \"$NGINX_CONF\" | sudo tee /etc/nginx/sites-available/karganot.conf >/dev/null; sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf; sudo nginx -t; sudo systemctl reload nginx;"

echo "[7/8] SSL issue/renew & UFW";
$SSHP $USER@$HOST bash -lc "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --agree-tos -m $EMAIL --non-interactive || true; sudo systemctl enable certbot.timer || true; sudo ufw allow OpenSSH; sudo ufw allow 80; sudo ufw allow 443; yes | sudo ufw enable || true"

echo "[8/8] Health + Final report";
$SSHP $USER@$HOST bash -lc "set -e; API_INT=\$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$API_PORT/api/v1/health || true); WEB_INT=\$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$WEB_PORT/ || true); API_EXT=\$(curl -s -o /dev/null -w '%{http_code}' https://$DOMAIN/api/v1/health || true); WEB_EXT=\$(curl -s -o /dev/null -w '%{http_code}' https://$DOMAIN/ || true); SSL_EXP=\$(sudo certbot certificates 2>/dev/null | awk '/Expiry Date/{print $3,$4,$5}' | head -n1); { echo DATE: \$(date -u); echo API_INTERNAL: $API_INT; echo WEB_INTERNAL: $WEB_INT; echo API_EXTERNAL: $API_EXT; echo WEB_EXTERNAL: $WEB_EXT; echo NGINX: \$(systemctl is-active nginx); echo SSL: $SSL_EXP; echo PM2:; pm2 list; } | tee $LOG_DIR/deploy-final-report.txt;"

echo "✅ Classic stable deploy script finished. Check report: sshpass -p '$PASSWORD' ssh -o StrictHostKeyChecking=no $USER@$HOST 'cat $LOG_DIR/deploy-final-report.txt'"
