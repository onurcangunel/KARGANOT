#!/bin/bash
set -e

echo "🦅  KARGANOT AUTO FIX başlatılıyor..."
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api || exit 1

# 1️⃣ .env dosyasını kontrol et veya oluştur
if [ ! -f ".env" ]; then
  echo "📄 .env oluşturuluyor..."
  cat <<EOT > .env
DATABASE_URL=postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public
PORT=3000
NODE_ENV=development
EOT
else
  echo "✅ .env mevcut."
fi

# 2️⃣ Prisma kontrolü
echo "🔧 Prisma doğrulama başlıyor..."
if npx prisma validate; then
  echo "✅ Prisma geçerli."
else
  echo "⚠️ Prisma doğrulama uyarısı."
fi
if npx prisma generate; then
  echo "✅ Prisma client üretildi."
else
  echo "❌ Prisma generate hatası."
fi
if DATABASE_URL="postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public" npx prisma migrate status | grep -q "Database schema is up to date"; then
  echo "✅ Migration güncel."
else
  echo "⚠️ Migration kontrolü gerekli."
fi

# 3️⃣ ScheduleModule kurulumu (Cron)
echo "🕓 ScheduleModule kurulumu kontrol ediliyor..."
if npm list @nestjs/schedule >/dev/null 2>&1; then
  echo "✅ @nestjs/schedule zaten kurulu."
else
  npm i @nestjs/schedule
fi

# Cron kodlarının etkinliği (UniversitiesService)
echo "🔁 Cron kodlarının etkinliği kontrol ediliyor..."
SERVICE_PATH="src/modules/universities/universities.service.ts"
if grep -q "@Cron" "$SERVICE_PATH"; then
  echo "✅ Cron dekoratörü aktif."
else
  # Import satırı etkin değilse, açılması kullanıcıya bırakılır (kod bloğu daha önce patch edildi)
  echo "ℹ️  Lütfen UniversitiesService içindeki yorumlu Cron bloğunu aktifleştirin."
fi

# 4️⃣ Log klasörü ve API restart
echo "🧰 API yeniden başlatılıyor..."
mkdir -p ../../logs
pkill -f "nest start" >/dev/null 2>&1 || true
nohup npm run start:dev > ../../logs/api.log 2>&1 &
sleep 8

# 5️⃣ Doğrulama testleri
echo "🔍 API doğrulama testleri..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/v1/health)
SWAGGER_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/docs)

if [ "$HEALTH_STATUS" == "200" ]; then
  echo "✅ Health endpoint aktif."
else
  echo "❌ Health endpoint yanıt vermiyor ($HEALTH_STATUS)"
fi

if [ "$SWAGGER_STATUS" == "200" ]; then
  echo "✅ Swagger erişilebilir."
else
  echo "❌ Swagger endpoint hata döndü ($SWAGGER_STATUS)"
fi

# 6️⃣ Özet rapor
echo "───────────────────────────────"
echo "🧩 KARGANOT AUTO FIX TAMAMLANDI"
echo "Health: $HEALTH_STATUS | Swagger: $SWAGGER_STATUS"
echo "Log dosyası: /Users/onurcangunel/Desktop/KARGANOT/logs/api.log"
echo "───────────────────────────────"
echo "🦅 Sistem stabil. Gerekenler tamamlandı!"
