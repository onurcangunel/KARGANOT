#!/bin/bash
set -e

echo "🚀 [KARGANOT] Production deployment başlatılıyor..."

echo "🧱 1/5 → Docker container'lar build ediliyor..."
docker compose -f docker-compose.prod.yml down || true
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
echo "✅ Container'lar başarıyla ayağa kalktı."

echo "🩺 2/5 → Host doğrulaması yapılıyor..."
cd apps/web
npx tsx scripts/validate-host.ts || { echo "❌ Host doğrulama başarısız!"; exit 1; }

echo "🧪 3/5 → Smoke test'ler çalıştırılıyor..."
chmod +x scripts/smoke-tests.sh || true
./scripts/smoke-tests.sh || { echo "❌ Smoke test başarısız!"; exit 1; }

echo "🧠 4/5 → Build & typecheck doğrulaması..."
npm run lint && npm run typecheck && npm run build

echo "🎉 5/5 → Tüm sistemler senkronize!"
HOST_VAL=$(grep NEXT_PUBLIC_API_URL .env.production | cut -d '=' -f2)
echo "✅ KARGANOT API online"
echo "✅ WEB client connected"
echo "✅ Host verified: ${HOST_VAL:-http://localhost:3000}"
echo "🦅 Deployment successful — Production ready."
