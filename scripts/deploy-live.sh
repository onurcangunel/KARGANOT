#!/bin/bash
set -e

echo "🚀 [KARGANOT] Live deployment başlatılıyor..."

# 1️⃣ Güncel kodları çek
git pull origin main

# 2️⃣ Docker container'ları yeniden inşa et
docker compose -f docker-compose.prod.yml down || true
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

# 3️⃣ Bekleme süresi (API açılışını bekle)
echo "⏳ Servislerin açılması bekleniyor..."
sleep 15

# 4️⃣ Health kontrol
echo "🩺 Health check yapılıyor..."
# .env.production içinden host al
if [ -f .env.production ]; then
	export NEXT_PUBLIC_API_URL=$(grep -E '^NEXT_PUBLIC_API_URL=' .env.production | cut -d '=' -f2-)
fi
pushd apps/web >/dev/null
npx tsx scripts/validate-host.ts || { echo "❌ API health check failed"; popd >/dev/null; exit 1; }
popd >/dev/null

# 5️⃣ Smoke test
echo "🧪 Smoke tests çalıştırılıyor..."
chmod +x apps/web/scripts/smoke-tests.sh || true
HOST="$NEXT_PUBLIC_API_URL" ./apps/web/scripts/smoke-tests.sh || { echo "❌ Smoke tests failed"; exit 1; }

# 6️⃣ Build & typecheck doğrulama
npm run lint && npm run typecheck && npm run build

# 7️⃣ Domain doğrulama
echo "🌍 Domain kontrolü yapılıyor..."
curl -Is https://karganot.com | head -n 1 | grep "200" && echo "✅ Domain up" || { echo "❌ Domain erişimi başarısız"; exit 1; }

# 8️⃣ Başarılı sonuç
echo "✅ KARGANOT API online at https://api.karganot.com"
echo "✅ WEB client live at https://karganot.com"
echo "🧠 Production verified and stable 🦅"
