#!/usr/bin/env bash
set -euo pipefail
# KARGANOT – Deployment resume helper
# Bu script, kısmen çalışmış bir kurulumu tamamlar.
# Önkoşul: PASSWORD, HOST, USER env değişkenleri set edilmiş olmalı.

HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"karganot"}
PASSWORD=${PASSWORD:-""}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
REMOTE_BASE=/var/www/karganot
API_DIR=$REMOTE_BASE/api
WEB_DIR=$REMOTE_BASE/web
LOG_DIR=$REMOTE_BASE/logs

if [ -z "$PASSWORD" ]; then echo "PASSWORD yok"; exit 1; fi
SSHP="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USER@$HOST"

step() { echo "\n🔸 $1"; }

step "Dizin kontrolü"; $SSHP "mkdir -p $API_DIR $WEB_DIR $LOG_DIR"

step ".env kontrolü"; $SSHP "bash -lc 'test -f $API_DIR/.env || echo PORT=3000 > $API_DIR/.env'"
$SSHP "bash -lc 'grep -q DATABASE_URL $API_DIR/.env || echo DATABASE_URL=postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public >> $API_DIR/.env'"
$SSHP "bash -lc 'grep -q JWT_SECRET $API_DIR/.env || echo JWT_SECRET=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32) >> $API_DIR/.env'"
$SSHP "bash -lc 'grep -q FRONTEND_URL $API_DIR/.env || echo FRONTEND_URL=https://$DOMAIN >> $API_DIR/.env'"
$SSHP "bash -lc 'test -f $WEB_DIR/.env.production || cat > $WEB_DIR/.env.production <<EOF\nNEXT_PUBLIC_API_URL=https://$DOMAIN/api\nNEXTAUTH_URL=https://$DOMAIN\nNODE_ENV=production\nPORT=3024\nEOF'"

step "API install/build"; $SSHP "bash -lc 'cd $API_DIR && npm install --legacy-peer-deps --no-audit --no-fund && npx prisma generate && npx prisma migrate deploy || true && npm run build'"

step "PM2 API"; $SSHP "bash -lc 'sudo npm i -g pm2 >/dev/null 2>&1 || true; pm2 start $API_DIR/dist/main.js --name karganot-api --time || pm2 restart karganot-api; pm2 save'"

step "Web install/build"; $SSHP "bash -lc 'cd $WEB_DIR && npm install --legacy-peer-deps --no-audit --no-fund && npm run build'"

step "PM2 Web"; $SSHP "bash -lc 'pm2 start \"npm run start\" --name karganot-web --time || pm2 restart karganot-web; pm2 save'"

step "Nginx config"; $SSHP "bash -lc 'sudo tee /etc/nginx/sites-available/karganot.conf >/dev/null <<CONF\nserver {\n listen 80;\n server_name karganot.com www.karganot.com;\n location /api/ { proxy_pass http://127.0.0.1:3000/; proxy_set_header Host $host; }\n location / { proxy_pass http://127.0.0.1:3024; proxy_set_header Host $host; }\n}\nCONF\n sudo rm -f /etc/nginx/sites-enabled/default || true; sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf; sudo nginx -t && sudo systemctl reload nginx'"

step "SSL (certbot)"; $SSHP "bash -lc 'sudo certbot --nginx -d karganot.com -d www.karganot.com --non-interactive --agree-tos -m $EMAIL || true; sudo systemctl enable certbot.timer || true'"

step "UFW"; $SSHP "bash -lc 'sudo ufw allow OpenSSH; sudo ufw allow 80; sudo ufw allow 443; yes | sudo ufw enable || true'"

step "Doğrulama"; $SSHP "bash -lc 'API_CODE=\$(curl -s -o /dev/null -w %\{http_code\} https://karganot.com/api/v1/health || true); WEB_CODE=\$(curl -s -o /dev/null -w %\{http_code\} https://karganot.com || true); DIG_IP=\$(dig +short karganot.com || true); mkdir -p $LOG_DIR; echo Nginx: \$(systemctl is-active nginx) > $LOG_DIR/deploy-report.txt; echo Domain IP: $DIG_IP >> $LOG_DIR/deploy-report.txt; echo API /health: $API_CODE >> $LOG_DIR/deploy-report.txt; echo Web /: $WEB_CODE >> $LOG_DIR/deploy-report.txt; pm2 status | head -n 12 >> $LOG_DIR/deploy-report.txt; cat $LOG_DIR/deploy-report.txt'"

echo "✅ Resume tamamlandı. Rapor: $LOG_DIR/deploy-report.txt"
