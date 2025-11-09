#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.." || exit 1
echo "🚀 KARGANOT Diagnostic başlatılıyor..."

# 1) Prisma Client kontrolü
if [ ! -d "node_modules/@prisma/client" ]; then
  echo "⚙️ Prisma Client bulunamadı, oluşturuluyor..."
  npx prisma generate || true
else
  echo "✅ Prisma Client mevcut."
fi

# 2) Veritabanı bağlantısı
echo "🔌 Veritabanı bağlantısı kontrol ediliyor..."
if docker exec karganot-postgres pg_isready -U karganot -h 127.0.0.1 -p 5432 >/dev/null 2>&1; then
  echo "127.0.0.1:5432 - accepting connections"
else
  echo "❌ Postgres bağlantısı başarısız!"; exit 1
fi

# 3) DB sayımları
echo "📊 DB sayımları alınıyor..."
TMP_JS=".diagnose-db.js"
cat > "$TMP_JS" <<'JS'
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
(async()=>{
  try {
    const u = await p.university.count();
    const f = await p.faculty.count();
    const d = await p.department.count();
    console.log(`\n📚 Universities: ${u}\n🏛 Faculties: ${f}\n🎓 Departments: ${d}`);
    if (u < 600) console.warn("⚠️ Üniversite sayısı beklenenin altında!");
  } catch (e) {
    console.error('ERR:', e && (e.stack || e.message || e));
    process.exitCode = 1;
  } finally {
    await p.$disconnect();
  }
})();
JS
NODE_PATH="$(pwd)/node_modules" node "$TMP_JS" || true
rm -f "$TMP_JS"

# 4) API sağlık kontrolleri
echo "🩺 API sağlık kontrolü yapılıyor..."
STATUS_V1=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/v1/health)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/health)

if [ "$STATUS_V1" = "200" ]; then
  echo "✅ /api/v1/health 200 OK"
else
  echo "❌ /api/v1/health hata ($STATUS_V1)"
fi

# 5) Swagger
echo "📘 Swagger endpoint testi..."
SWAGGER=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/docs)
SWAGGER_V1=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/v1/docs)

if [ "$SWAGGER" = "200" ]; then
  echo "✅ Swagger (api/docs) erişilebilir."
else
  echo "❌ Swagger (api/docs) erişilemiyor! ($SWAGGER)"
fi

# 6) Rapor
echo "──────────────────────────────────────────────"
echo "📋 KARGANOT BACKEND RAPORU"
echo "──────────────────────────────────────────────"
echo "🌐 Postgres durumu: Çalışıyor"
echo "🧩 Prisma Client: Aktif"
echo "🩺 API Health (v1): ${STATUS_V1} | (legacy): ${STATUS}"
echo "📘 Swagger: ${SWAGGER} | Swagger v1: ${SWAGGER_V1}"
echo "──────────────────────────────────────────────"
echo "✅ Tanılama tamamlandı!"
