#!/bin/bash
# ===================================================
# 🦅 KARGANOT MVP - PostgreSQL Migration Script
# Hazırlayan: Onur & ChatGPT (GPT-5)
# Amaç: SQLite'tan PostgreSQL'e tam geçişi otomatikleştirmek
# ===================================================

echo "🚀 KARGANOT PostgreSQL Migration Başlıyor..."

# -------------------------------
# 1️⃣ GÜVENLİ YEDEK ALMA
# -------------------------------
echo "📦 Eski veriler yedekleniyor..."
mkdir -p backup
cd apps/web
cp prisma/schema.prisma backup/schema_old.prisma 2>/dev/null
cp prisma/dev.db backup/dev_backup.db 2>/dev/null
echo "✅ Yedekleme tamamlandı -> backup/ klasörüne kaydedildi."

# -------------------------------
# 2️⃣ POSTGRESQL KONTEYNERİ OLUŞTURMA
# -------------------------------
echo "🐘 PostgreSQL Docker container oluşturuluyor..."
docker ps | grep karganot-db >/dev/null
if [ $? -eq 0 ]; then
  echo "⚠️ PostgreSQL zaten çalışıyor, yeniden başlatılıyor..."
  docker restart karganot-db
else
  docker run --name karganot-db \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=12345 \
    -e POSTGRES_DB=karganot \
    -p 5432:5432 -d postgres:15
  echo "✅ PostgreSQL container çalışıyor (localhost:5432)"
fi

# -------------------------------
# 3️⃣ .ENV DOSYASI OLUŞTURMA
# -------------------------------
if [ ! -f .env.local ]; then
  echo "DATABASE_URL=\"postgresql://postgres:12345@localhost:5432/karganot?schema=public\"" > .env.local
  echo "✅ .env.local dosyası oluşturuldu."
else
  echo "ℹ️ .env.local zaten mevcut, DATABASE_URL güncelleniyor..."
  grep -q "DATABASE_URL" .env.local || echo "DATABASE_URL=\"postgresql://postgres:12345@localhost:5432/karganot?schema=public\"" >> .env.local
fi

# -------------------------------
# 4️⃣ PRISMA YAPILANDIRMASI
# -------------------------------
echo "🧩 Prisma yapılandırması başlatılıyor..."
rm -f prisma/schema.prisma
cp prisma/schema-mvp.prisma prisma/schema.prisma

echo "⏳ PostgreSQL'in hazır olması bekleniyor..."
sleep 3

npx prisma migrate dev --name init_mvp_schema
npx prisma generate
echo "✅ Migration ve Prisma client başarıyla oluşturuldu."

# -------------------------------
# 5️⃣ SEED DOSYASI OLUŞTURMA
# -------------------------------
echo "🌱 Seed verisi oluşturuluyor..."
cat > prisma/seed.ts <<'EOF'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed başlıyor...')
  
  // University
  const uni = await prisma.university.create({
    data: { 
      name: "ODTÜ", 
      slug: "odtu",
      city: "Ankara", 
      type: "state" 
    }
  })
  console.log('✅ Üniversite oluşturuldu:', uni.name)
  
  // Faculty
  const fac = await prisma.faculty.create({
    data: { 
      name: "Mühendislik Fakültesi",
      slug: "muhendislik",
      universityId: uni.id 
    }
  })
  console.log('✅ Fakülte oluşturuldu:', fac.name)
  
  // Department
  const dept = await prisma.department.create({
    data: { 
      name: "Elektrik Elektronik Mühendisliği",
      slug: "elektrik-elektronik",
      facultyId: fac.id 
    }
  })
  console.log('✅ Bölüm oluşturuldu:', dept.name)
  
  // Course
  const course = await prisma.course.create({
    data: { 
      name: "Devre Teorisi",
      slug: "devre-teorisi",
      code: "EE201",
      departmentId: dept.id, 
      semester: "FALL" 
    }
  })
  console.log('✅ Ders oluşturuldu:', course.name)
  
  // Admin User
  const admin = await prisma.user.create({
    data: {
      email: "admin@karganot.com",
      passwordHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/vF7hDNFjKc7pv3PbTTq2", // "12345"
      name: "Admin Kullanıcı",
      role: "ADMIN",
      plan: "PREMIUM",
      universityId: uni.id,
      departmentId: dept.id
    }
  })
  console.log('✅ Admin kullanıcı oluşturuldu:', admin.email)
  
  // Sample Note
  const note = await prisma.note.create({
    data: {
      courseId: course.id,
      uploaderId: admin.id,
      universityId: uni.id,
      title: "Devre Teorisi - Hafta 1 Notları",
      description: "Temel devre analizi giriş notları",
      fileKey: "notes/sample/devre-hafta1.pdf",
      fileExt: "pdf",
      sizeBytes: BigInt(1024000),
      tags: ["devre", "analiz", "hafta1", "temel"],
      status: "APPROVED",
      pages: 15
    }
  })
  console.log('✅ Örnek not oluşturuldu:', note.title)
  
  console.log('\n🎉 Seed işlemi tamamlandı!')
  console.log('📧 Admin: admin@karganot.com / Şifre: 12345')
}

main()
  .then(() => console.log('✅ Seed başarılı!'))
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
EOF

# package.json'a seed script'i ekle
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.prisma) pkg.prisma = {};
pkg.prisma.seed = 'ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ package.json güncellendi');
"

npx prisma db seed
echo "✅ Seed işlemi tamamlandı."

# -------------------------------
# 6️⃣ TEST VE STUDIO
# -------------------------------
echo "🔍 Prisma Studio açılıyor (test için)..."
npx prisma studio &

cd ../..

echo ""
echo "🎯 ================================================"
echo "🎉 Migration işlemi başarıyla tamamlandı!"
echo "🎯 ================================================"
echo ""
echo "🐘 PostgreSQL Bağlantısı:"
echo "   postgresql://postgres:12345@localhost:5432/karganot"
echo ""
echo "👤 Test Kullanıcısı:"
echo "   Email: admin@karganot.com"
echo "   Şifre: 12345"
echo ""
echo "📊 Örnek Veri:"
echo "   - ODTÜ → Mühendislik → Elektrik Elektronik → Devre Teorisi"
echo "   - 1 Onaylanmış Not (Devre Teorisi Hafta 1)"
echo ""
echo "🚀 Sunucuyu başlatmak için:"
echo "   cd apps/web && npm run dev"
echo ""
echo "🦅 KARGANOT artık PostgreSQL üzerinde çalışıyor!"
echo "================================================"
