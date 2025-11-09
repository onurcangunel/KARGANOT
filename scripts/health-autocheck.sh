#!/usr/bin/env bash
set -euo pipefail

STACK_FILE=${STACK_FILE:-docker-compose.prod.yml}
URL=${URL:-"https://api.karganot.com/api/health"}
LOG_FILE=${LOG_FILE:-"/var/log/karganot-health.log"}

TS=$(date '+%Y-%m-%d %H:%M:%S')
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo 000)

if [ "$STATUS" != "200" ]; then
  echo "$TS ❌ API Down! status=$STATUS Restarting stack..." | tee -a "$LOG_FILE"
  docker compose -f "$STACK_FILE" restart api || true
else
  echo "$TS ✅ API OK" | tee -a "$LOG_FILE"
fi
