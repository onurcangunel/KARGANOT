#!/usr/bin/env bash
set -euo pipefail

# Config
DRY_RUN=${DRY_RUN:-0}
LOG_DIR=${LOG_DIR:-/root/logs}
REPORT="$LOG_DIR/karganot-prod-fix-report.txt"

# Resolve repo root reliably (script location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

mkdir -p "$LOG_DIR"

log() { echo -e "$1" | tee -a "$REPORT"; }
run() {
  if [ "$DRY_RUN" = "1" ]; then
    log "[DRY-RUN] $*"; return 0;
  fi
  eval "$@"
}

log "== KARGANOT Production AutoFix Started at $(date) =="

# 1) DNS EŞLEŞTİRME
HOST_IP=$(curl -s ifconfig.me || echo "0.0.0.0")
# dig fallback if not available
if command -v dig >/dev/null 2>&1; then
  DNS_MAIN=$(dig +short karganot.com | tr '\n' ' ')
  DNS_API=$(dig +short api.karganot.com | tr '\n' ' ')
else
  DNS_MAIN=$(getent hosts karganot.com | awk '{print $1}' | tr '\n' ' ')
  DNS_API=$(getent hosts api.karganot.com | awk '{print $1}' | tr '\n' ' ')
fi

log "== DNS Kontrol =="
log "Host IP: $HOST_IP"
log "karganot.com: $DNS_MAIN"
log "api.karganot.com: $DNS_API"

if [[ "$DNS_MAIN" != *"$HOST_IP"* ]] || [[ "$DNS_API" != *"$HOST_IP"* ]]; then
  log "❌ DNS uyuşmazlığı! Tüm A kayıtlarını $HOST_IP olarak ayarla."
else
  log "✅ DNS eşleşti."
fi

# 2) SSL SERTİFİKA KONTROL & YENİLEME
if [ ! -f /etc/letsencrypt/live/karganot.com/fullchain.pem ]; then
  log "⚙️ SSL bulunamadı, sertifika alınacak..."
  # Ensure certbot installed
  if ! command -v certbot >/dev/null 2>&1; then
    run "apt update && apt install -y certbot python3-certbot-nginx"
  fi
  run "certbot --nginx -d karganot.com -d www.karganot.com -d api.karganot.com --non-interactive --agree-tos -m admin@karganot.com"
  # nginx reload (docker veya sistemd)
  if docker ps --format '{{.Names}}' | grep -q '^nginx$'; then
    run "docker exec nginx nginx -s reload"
  else
    run "systemctl reload nginx"
  fi
else
  log "✅ SSL mevcut."
fi

# 3) HEALTH SCRIPT & CRON
if [ ! -f /root/scripts/health-autocheck.sh ]; then
  run "mkdir -p /root/scripts"
  # Kaynak dosya (öncelik: /app mount, değilse repo root)
  if [ -f /app/scripts/health-autocheck.sh ]; then SRC="/app/scripts/health-autocheck.sh"; else SRC="$REPO_ROOT/scripts/health-autocheck.sh"; fi
  run "cp \"$SRC\" /root/scripts/health-autocheck.sh"
  run "chmod +x /root/scripts/health-autocheck.sh"
  log "✅ Health script kopyalandı."
fi

# Health cron
CRON_EXISTS=$( (crontab -l 2>/dev/null || true) | grep -c "health-autocheck" )
if [ $CRON_EXISTS -eq 0 ]; then
  (crontab -l 2>/dev/null; echo "*/15 * * * * bash /root/scripts/health-autocheck.sh") | run crontab -
  log "✅ Health cron eklendi."
fi

# SSL yenileme cron
SSL_CRON_EXISTS=$( (crontab -l 2>/dev/null || true) | grep -c "certbot renew" )
if [ $SSL_CRON_EXISTS -eq 0 ]; then
  (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet && (docker exec nginx nginx -s reload 2>/dev/null || systemctl reload nginx)" ) | run crontab -
  log "✅ SSL yenileme cron eklendi."
fi

# 4) HEALTH TEST
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.karganot.com/api/health || echo 000)
if [ "$STATUS" = "200" ]; then
  log "✅ API Health: 200 OK"
else
  log "❌ API Health başarısız. Durum kodu: $STATUS"
fi

log "== KARGANOT Production AutoFix tamamlandı. Rapor: $REPORT =="
