#!/bin/bash

# 🧪 YÖK ATLAS ENTEGRASYON TEST SCRIPT
# Quick testing için kullanın

echo "🧪 YÖK ATLAS Entegrasyon Testi Başlıyor..."
echo "=========================================="

# 1. Python API Test
echo ""
echo "1️⃣ Python API Kontrolü..."
PYTHON_API_STATUS=$(curl -s http://localhost:8000/ 2>&1)

if [[ $PYTHON_API_STATUS == *"version"* ]]; then
  echo "✅ Python API çalışıyor (http://localhost:8000)"
else
  echo "❌ Python API çalışmıyor!"
  echo "   Lütfen başlatın: cd python-api && python main.py"
  exit 1
fi

# 2. Üniversite Sayısı
echo ""
echo "2️⃣ Üniversite Verisi Kontrolü..."
UNI_COUNT=$(curl -s http://localhost:8000/universities 2>&1 | jq '. | length' 2>/dev/null)

if [[ $UNI_COUNT -gt 100 ]]; then
  echo "✅ $UNI_COUNT üniversite bulundu"
else
  echo "⚠️ Sadece $UNI_COUNT üniversite var (beklenen: 200+)"
fi

# 3. Test: Muğla Üniversitesi
echo ""
echo "3️⃣ Test: 'Muğla' Araması..."
MUGLA_TEST=$(curl -s "http://localhost:8000/universities" 2>&1 | jq '.[] | select(.universityName | contains("MUĞLA"))' 2>/dev/null)

if [[ ! -z "$MUGLA_TEST" ]]; then
  echo "✅ Muğla Üniversitesi bulundu"
  echo "$MUGLA_TEST" | jq -r '.universityName'
else
  echo "❌ Muğla Üniversitesi bulunamadı"
fi

# 4. Test: Fakülteler
echo ""
echo "4️⃣ Test: Muğla Fakülte Sayısı..."
FACULTY_COUNT=$(curl -s "http://localhost:8000/faculties?universityName=MUĞLA%20SITKI%20KOÇMAN%20ÜNİVERSİTESİ" 2>&1 | jq '. | length' 2>/dev/null)

if [[ $FACULTY_COUNT -gt 5 ]]; then
  echo "✅ $FACULTY_COUNT fakülte/birim bulundu"
else
  echo "⚠️ Sadece $FACULTY_COUNT fakülte var"
fi

# 5. Database Kontrolü
echo ""
echo "5️⃣ SQLite Database Kontrolü..."
if [[ -f "apps/web/prisma/dev.db" ]]; then
  DB_UNI_COUNT=$(sqlite3 apps/web/prisma/dev.db "SELECT COUNT(*) FROM universities;" 2>/dev/null)
  DB_UNIT_COUNT=$(sqlite3 apps/web/prisma/dev.db "SELECT COUNT(*) FROM university_units;" 2>/dev/null)
  DB_DEPT_COUNT=$(sqlite3 apps/web/prisma/dev.db "SELECT COUNT(*) FROM departments;" 2>/dev/null)
  
  echo "✅ Database var:"
  echo "   📊 Üniversite: $DB_UNI_COUNT"
  echo "   📁 Birim: $DB_UNIT_COUNT"
  echo "   📚 Bölüm: $DB_DEPT_COUNT"
  
  if [[ $DB_UNI_COUNT -lt 10 ]]; then
    echo ""
    echo "⚠️ Database boş görünüyor!"
    echo "   Seed script çalıştırın: npm run db:seed:yok-atlas"
  fi
else
  echo "⚠️ Database bulunamadı (apps/web/prisma/dev.db)"
fi

# 6. Next.js API Test (opsiyonel - dev server çalışıyorsa)
echo ""
echo "6️⃣ Next.js API Test (opsiyonel)..."
NEXTJS_TEST=$(curl -s http://localhost:3000/api/yok-atlas/universities 2>&1)

if [[ $NEXTJS_TEST == *"success"* ]]; then
  echo "✅ Next.js API çalışıyor (http://localhost:3000)"
else
  echo "⏭️ Next.js dev server çalışmıyor (normal - opsiyonel test)"
fi

echo ""
echo "=========================================="
echo "✅ Test Tamamlandı!"
echo ""
echo "📝 Sonraki Adımlar:"
echo "   1. Python API çalıştır: cd python-api && python main.py"
echo "   2. Seed script çalıştır: cd apps/web && npm run db:seed:yok-atlas"
echo "   3. Next.js başlat: cd apps/web && npm run dev"
echo "   4. Test et: http://localhost:3000/upload"
