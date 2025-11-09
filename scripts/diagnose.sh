#!/bin/bash
set -e

echo "🔍 KARGANOT API Diagnose Başlatılıyor..."

cd /Users/onurcangunel/Desktop/KARGANOT/apps/api

echo "\n▶ Prisma kontrolü"
if npx prisma validate; then
  echo "✅ Prisma valid"
else
  echo "❌ Prisma error"
fi

if DATABASE_URL="postgresql://karganot:karganot123@127.0.0.1:5432/karganot?schema=public" npx prisma migrate status | grep -q "Database schema is up to date"; then
  echo "✅ DB up-to-date"
else
  echo "⚠️ Migration needed"
fi

echo "\n▶ API sağlık kontrolü"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/api/v1/health || true

echo "\n▶ Swagger erişimi"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/api/docs || true

echo "\n▶ Docker PostgreSQL"
docker ps --filter name=karganot-postgres --format '{{.Names}}: {{.Status}}'
docker exec karganot-postgres pg_isready -U karganot || true

echo "\n✅ Tüm testler tamamlandı."
