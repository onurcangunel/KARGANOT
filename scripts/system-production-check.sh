#!/usr/bin/env bash
set -euo pipefail

REPORT="logs/system-production-report.txt"
STACK_FILE=${STACK_FILE:-docker-compose.prod.yml}

mkdir -p logs

echo "🧠 KARGANOT Production Check Started at $(date)" | tee -a "$REPORT"

echo "\n1) DNS CHECK" | tee -a "$REPORT"
echo "karganot.com -> $(dig +short karganot.com | tr '\n' ' ')" | tee -a "$REPORT" || true
echo "api.karganot.com -> $(dig +short api.karganot.com | tr '\n' ' ')" | tee -a "$REPORT" || true

echo "\n2) SSL CERT CHECK" | tee -a "$REPORT"
if [ -f /etc/letsencrypt/live/karganot.com/fullchain.pem ]; then
  END=$(openssl x509 -enddate -noout -in /etc/letsencrypt/live/karganot.com/fullchain.pem | cut -d= -f2)
  echo "notAfter=$END" | tee -a "$REPORT"
else
  echo "cert file missing: /etc/letsencrypt/live/karganot.com/fullchain.pem" | tee -a "$REPORT"
fi

echo "\n3) API HEALTH" | tee -a "$REPORT"
curl -I --max-time 10 https://api.karganot.com/api/health 2>/dev/null | head -n1 | tee -a "$REPORT" || true

echo "\n4) UI HEALTH" | tee -a "$REPORT"
curl -I --max-time 10 https://karganot.com 2>/dev/null | head -n1 | tee -a "$REPORT" || true

echo "\n5) HEALTH AUTOCHECK (manual)" | tee -a "$REPORT"
if [ -x /root/scripts/health-autocheck.sh ]; then
  bash /root/scripts/health-autocheck.sh || true
  tail -n 3 /var/log/karganot-health.log 2>/dev/null | tee -a "$REPORT" || true
else
  echo "health-autocheck.sh not found or not executable" | tee -a "$REPORT"
fi

echo "\n6) CRON CHECK" | tee -a "$REPORT"
sudo grep -E "health-autocheck|certbot renew" /etc/crontab 2>/dev/null | tee -a "$REPORT" || true

echo "\n7) DOCKER LOGS (nginx, api)" | tee -a "$REPORT"
docker compose -f "$STACK_FILE" logs -n 50 nginx 2>/dev/null | sed -n '1,20p' | tee -a "$REPORT" || true
docker compose -f "$STACK_FILE" logs -n 50 api 2>/dev/null | sed -n '1,20p' | tee -a "$REPORT" || true

echo "\n✅ SSL, API, UI, CRON, HEALTH checks executed." | tee -a "$REPORT"
echo "🧠 KARGANOT Production Check Completed at $(date)" | tee -a "$REPORT"
