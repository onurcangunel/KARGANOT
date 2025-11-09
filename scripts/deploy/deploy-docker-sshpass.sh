#!/usr/bin/env bash
set -euo pipefail

HOST=${HOST:-"46.252.192.249"}
USER=${USER:-"karganot"}
PASSWORD=${PASSWORD:-""}
DOMAIN=${DOMAIN:-"karganot.com"}
EMAIL=${EMAIL:-"onurcangunel@icloud.com"}
REMOTE_BASE=${REMOTE_BASE:-"/var/www/karganot"}
REMOTE_REPO=${REMOTE_REPO:-"$REMOTE_BASE/repo"}

if [ -z "$PASSWORD" ]; then echo "Set PASSWORD"; exit 1; fi

SSHP="sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no"
RSYNC_SSH="$SSHP"

# Sync repo into dedicated folder to avoid clobbering existing runtime dirs
$RSYNC_SSH $USER@$HOST mkdir -p $REMOTE_REPO
rsync -az --delete --exclude node_modules --exclude .next -e "sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no" \
  /Users/onurcangunel/Desktop/KARGANOT/ $USER@$HOST:$REMOTE_REPO/

# Remote: build docker images and start compose
$SSHP $USER@$HOST bash -lc "set -e; cd $REMOTE_REPO; \
  sudo apt update -y; \
  sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx; \
  # Build & Up (sudo to avoid group relogin issues)
  DOMAIN=$DOMAIN DATABASE_URL=\"${DATABASE_URL:-}\" sudo docker compose -f docker/docker-compose.prod.yml build; \
  DOMAIN=$DOMAIN DATABASE_URL=\"${DATABASE_URL:-}\" sudo docker compose -f docker/docker-compose.prod.yml up -d; \
  # Nginx config
  sudo ln -sf $REMOTE_REPO/docker/nginx/karganot.conf /etc/nginx/sites-available/karganot.conf; \
  sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf; \
  sudo nginx -t; sudo systemctl reload nginx; \
  # SSL issue/renew
  sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --agree-tos -m $EMAIL --non-interactive || true; \
  sudo systemctl enable certbot.timer || true; \
  # Health and report
  mkdir -p $REMOTE_BASE/logs; \
  API_CODE_INT=\$(curl -s -o /dev/null -w \"%{http_code}\" http://127.0.0.1:3000/api/v1/health || true); \
  WEB_CODE_INT=\$(curl -s -o /dev/null -w \"%{http_code}\" http://127.0.0.1:3024/ || true); \
  API_CODE_EXT=\$(curl -s -o /dev/null -w \"%{http_code}\" https://$DOMAIN/api/v1/health || true); \
  WEB_CODE_EXT=\$(curl -s -o /dev/null -w \"%{http_code}\" https://$DOMAIN/ || true); \
  SSL_EXP=\$(sudo certbot certificates 2>/dev/null | awk '/Expiry Date/{print \$3,\$4,\$5}' | head -n1); \
  { \
    echo DATE: \$(date -u); \
  echo API INTERNAL: \$API_CODE_INT; \
  echo WEB INTERNAL: \$WEB_CODE_INT; \
  echo API EXTERNAL: \$API_CODE_EXT; \
  echo WEB EXTERNAL: \$WEB_CODE_EXT; \
    echo NGINX: \$(systemctl is-active nginx); \
  echo SSL: \$SSL_EXP; \
    echo PM2: \"(dockerized)\"; \
  } | tee $REMOTE_BASE/logs/deploy-final-report.txt; \
  cat $REMOTE_BASE/logs/deploy-final-report.txt; \
"

echo "Deployed via docker-compose."
