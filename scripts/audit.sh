#!/usr/bin/env bash
set -e

echo "🚀 KARGANOT Sistem Sağlık Denetimi Başlıyor..."

step() { echo "\n$1"; }

step "1️⃣ Docker servis durumu kontrol ediliyor..."
if ! docker ps --format "table {{.Names}}\t{{.Status}}"; then
  echo "❌ Docker çalışmıyor."
fi

step "2️⃣ Container log analizi (nginx, api, web)..."
docker compose -f docker-compose.prod.yml logs --tail=30 nginx api web > ./system_logs.txt || echo "⚠️ Loglar alınamadı."
echo "↩️  Son 30 satır ./system_logs.txt içine yazıldı"

API_HOST=${API_HOST:-${NEXT_PUBLIC_API_URL:-https://api.karganot.com}}
WEB_HOST=${WEB_HOST:-https://karganot.com}

step "3️⃣ API Health endpoint testi..."
curl -s "$API_HOST/api/health" | grep '"ok":\s*true' >/dev/null && echo "✅ API health OK" || echo "❌ API health başarısız."

step "4️⃣ Search endpoint testi..."
curl -s "$API_HOST/api/v1/search?q=test" | grep '"ok":\s*true' >/dev/null && echo "✅ Search OK" || echo "⚠️ Search endpoint beklenen yanıtı vermedi."

step "5️⃣ Domain erişim testi..."
curl -Is "$WEB_HOST" | head -n 1 | grep "200" >/dev/null && echo "✅ Domain OK" || echo "❌ Domain erişilemiyor."

step "6️⃣ SSL sertifika kontrolü..."
echo | openssl s_client -connect karganot.com:443 -servername karganot.com 2>/dev/null | openssl x509 -noout -dates || echo "⚠️ SSL sertifikası okunamadı."

step "7️⃣ Firewall durumu..."
sudo ufw status || echo "⚠️ ufw yüklü değil veya erişim kısıtlı."

step "8️⃣ Disk ve RAM kontrolü..."
df -h | grep -E '^/dev/' | awk '{print $1, $5, $6}'
free -h || vm_stat 2>/dev/null || true

echo "\n✅ Denetim tamamlandı. Rapor:"
echo "-------------------------------------------"
CONTAINERS=$(docker ps -q | wc -l | tr -d ' ')
HEALTH=$(curl -s "$API_HOST/api/health" | grep -o true || echo false)
DOMAIN_HEAD=$(curl -Is "$WEB_HOST" | head -n 1)
SSL_EXP=$(echo | openssl s_client -connect karganot.com:443 -servername karganot.com 2>/dev/null | openssl x509 -noout -dates | grep notAfter || echo "unknown")
echo "Docker container'ları: ${CONTAINERS:-0} aktif"
echo "Health endpoint: ${HEALTH:-false}"
echo "Domain yanıt: ${DOMAIN_HEAD}"
echo "SSL sertifika: ${SSL_EXP}"
echo "-------------------------------------------"
echo "🧠 KARGANOT System Audit tamamlandı."
