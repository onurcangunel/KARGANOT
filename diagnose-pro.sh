#!/bin/bash
# 🦅 KARGANOT Advanced Diagnostic & Auto Report
# Author: Onur & ChatGPT
# Purpose: Automate backend health checks, DB stats, and JSON report creation.

BASE_DIR="/Users/onurcangunel/Desktop/KARGANOT"
API_DIR="$BASE_DIR/apps/api"
LOG_DIR="$BASE_DIR/logs"
REPORT_FILE="$LOG_DIR/diagnose-report.json"
LOG_FILE="$LOG_DIR/diagnose.log"

mkdir -p "$LOG_DIR"

echo "🧩 KARGANOT DIAGNOSE STARTED - $(date)" | tee -a "$LOG_FILE"
cd "$API_DIR" || exit 1

# 1️⃣ Load env
if [ -f "$API_DIR/.env" ]; then
  export $(grep -v '^#' "$API_DIR/.env" | xargs)
  echo "✅ Environment loaded from .env" | tee -a "$LOG_FILE"
else
  echo "⚠️ .env not found, using default values." | tee -a "$LOG_FILE"
  export DATABASE_URL="postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public"
  export PORT=3000
fi

# 2️⃣ Prisma Client Check
if [ ! -d "$API_DIR/node_modules/@prisma/client" ]; then
  echo "⚙️ Generating Prisma Client..." | tee -a "$LOG_FILE"
  npx prisma generate >>"$LOG_FILE" 2>&1
else
  echo "✅ Prisma Client already exists." | tee -a "$LOG_FILE"
fi

# 3️⃣ Database Connectivity
echo "🔌 Checking PostgreSQL..." | tee -a "$LOG_FILE"
docker exec karganot-postgres pg_isready -U karganot -h 127.0.0.1 -p 5432 >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ PostgreSQL not reachable!" | tee -a "$LOG_FILE"
  exit 1
fi
echo "✅ PostgreSQL connection OK." | tee -a "$LOG_FILE"

# 4️⃣ DB Counts
echo "📊 Collecting DB counts..." | tee -a "$LOG_FILE"
STATS=$(node - <<'NODE'
const { PrismaClient } = require("@prisma/client");
(async()=>{
  const p = new PrismaClient();
  const u = await p.university.count();
  const f = await p.faculty.count();
  const d = await p.department.count();
  console.log(JSON.stringify({ universities: u, faculties: f, departments: d }));
  await p.$disconnect();
})();
NODE
)

UNIV=$(echo $STATS | jq -r '.universities')
FAC=$(echo $STATS | jq -r '.faculties')
DEP=$(echo $STATS | jq -r '.departments')

echo "✅ Universities: $UNIV | Faculties: $FAC | Departments: $DEP" | tee -a "$LOG_FILE"

# 5️⃣ API Health & Docs
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/v1/health)
DOCS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/docs)

# 6️⃣ JSON Report
echo "🧾 Writing JSON report..." | tee -a "$LOG_FILE"
cat > "$REPORT_FILE" <<EOF
{
  "timestamp": "$(date +'%Y-%m-%d %H:%M:%S')",
  "api_health": "$HEALTH_CODE",
  "api_docs": "$DOCS_CODE",
  "universities": $UNIV,
  "faculties": $FAC,
  "departments": $DEP,
  "database": "connected",
  "status": "ok"
}
EOF

echo "✅ JSON report saved to: $REPORT_FILE" | tee -a "$LOG_FILE"

# 7️⃣ Summary Output
echo "──────────────────────────────"
echo "📋 KARGANOT DAILY REPORT"
echo "──────────────────────────────"
echo "🕒 Date: $(date)"
echo "🌐 Health: $HEALTH_CODE"
echo "📘 Docs: $DOCS_CODE"
echo "🏫 Universities: $UNIV"
echo "🏛 Faculties: $FAC"
echo "🎓 Departments: $DEP"
echo "──────────────────────────────"
echo "📦 Report: $REPORT_FILE"
echo "🪶 Log: $LOG_FILE"
echo "✅ Done!"
