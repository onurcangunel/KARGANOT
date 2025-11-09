#!/bin/bash
# 🦅 KARGANOT – Automated Nightly Diagnostic with Email Report
# Çalışma zamanı: Her gece 03:00
# Author: Onur & ChatGPT

BASE_DIR="/Users/onurcangunel/Desktop/KARGANOT"
API_DIR="$BASE_DIR/apps/api"
LOG_DIR="$BASE_DIR/logs"
REPORT_FILE="$LOG_DIR/diagnose-report.json"
LOG_FILE="$LOG_DIR/diagnose.log"

MAIL_TO="onurcangunel@icloud.com"   # ← Buraya kendi e-posta adresini yaz
MAIL_SUBJECT="📊 KARGANOT Günlük Sistem Raporu ($(date +'%Y-%m-%d'))"

mkdir -p "$LOG_DIR"
cd "$API_DIR" || exit 1

echo "🩺 Nightly Diagnose Started - $(date)" >"$LOG_FILE"

# 1️⃣ Ortam Değişkenleri
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
else
  export DATABASE_URL="postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public"
  export PORT=3000
fi

# 2️⃣ Prisma Client Kontrol
if [ ! -d "node_modules/@prisma/client" ]; then
  npx prisma generate >>"$LOG_FILE" 2>&1
fi

# 3️⃣ PostgreSQL Bağlantısı
docker exec karganot-postgres pg_isready -U karganot -h 127.0.0.1 -p 5432 >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ PostgreSQL bağlantısı başarısız!" >>"$LOG_FILE"
  STATUS="error"
else
  echo "✅ PostgreSQL bağlantısı başarılı." >>"$LOG_FILE"
  STATUS="ok"
fi

# 4️⃣ Sayımları Topla
STATS=$(node - <<'NODE'
const { PrismaClient } = require("@prisma/client");
(async()=>{
  const p = new PrismaClient();
  const u = await p.university.count();
  const f = await p.faculty.count();
  const d = await p.department.count();
  console.log(JSON.stringify({ universities:u, faculties:f, departments:d }));
  await p.$disconnect();
})();
NODE
)

UNIV=$(echo "$STATS" | jq -r '.universities')
FAC=$(echo "$STATS" | jq -r '.faculties')
DEP=$(echo "$STATS" | jq -r '.departments')

# 5️⃣ Health ve Docs Kontrolü
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/v1/health)
DOCS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/docs)

# 6️⃣ JSON Raporu Yaz
cat > "$REPORT_FILE" <<EOF
{
  "timestamp": "$(date +'%Y-%m-%d %H:%M:%S')",
  "api_health": "$HEALTH_CODE",
  "api_docs": "$DOCS_CODE",
  "universities": $UNIV,
  "faculties": $FAC,
  "departments": $DEP,
  "database": "$STATUS"
}
EOF

# 7️⃣ E-Posta ile Gönder
MAIL_BODY=$(cat <<MSG
📊 KARGANOT Günlük Sistem Raporu

🕒 Tarih: $(date)
🩺 Health: $HEALTH_CODE
📘 Swagger: $DOCS_CODE
🏫 Üniversiteler: $UNIV
🏛 Fakülteler: $FAC
🎓 Bölümler: $DEP
──────────────────────
JSON Rapor: $REPORT_FILE
Log Dosyası: $LOG_FILE
MSG
)

echo "$MAIL_BODY" | mail -s "$MAIL_SUBJECT" "$MAIL_TO"

echo "✅ Rapor başarıyla e-posta olarak gönderildi: $MAIL_TO"
