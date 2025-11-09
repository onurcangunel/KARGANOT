#!/usr/bin/env bash
set -e

HOST=${NEXT_PUBLIC_API_URL:-http://localhost:3000}
HOST=${HOST:-${NEXT_PUBLIC_API_URL:-http://localhost:3000}}
TOKEN=${TOKEN:-}

echo "🧪 Smoke tests on $HOST"
echo "- /api/health"
curl -sS "$HOST/api/health" | tee /tmp/health.json | grep '"ok":\s*true' >/dev/null && echo "✅ Health OK" || { echo "❌ Health FAIL"; exit 1; }

echo "- /api/v1/search?q=test"
curl -sS "$HOST/api/v1/search?q=test" | tee /tmp/search.json | grep '"ok":\s*true' >/dev/null && echo "✅ Search OK" || { echo "❌ Search FAIL"; exit 1; }

if [ -n "$TOKEN" ]; then
  echo "- POST /api/v1/notes/123/ratings"
  curl -sS -X POST "$HOST/api/v1/notes/123/ratings" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"rating":5}' | tee /tmp/ratings.json | grep '"ok":\s*true' >/dev/null && echo "✅ Ratings OK" || echo "⚠️ Ratings skipped/failed"
  echo "- POST /api/v1/notes/123/report"
  curl -sS -X POST "$HOST/api/v1/notes/123/report" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"reason":"invalid content"}' | tee /tmp/report.json | grep '"ok":\s*true' >/dev/null && echo "✅ Report OK" || echo "⚠️ Report skipped/failed"
else
  echo "(skip auth-required endpoints, TOKEN missing)"
fi

echo "🧠 Smoke tests tamamlandı — tüm zorunlu endpoint’ler OK."
