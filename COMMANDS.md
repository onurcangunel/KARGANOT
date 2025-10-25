# 🎯 KARGA NOT - Terminal Komutları

Bu dosya, projeyi çalıştırmak için gereken TÜM terminal komutlarını içerir.
Sırayla kopyala-yapıştır yapabilirsiniz.

================================================================================
## ⚡ HIZLI BAŞLATMA (Tüm Komutlar Bir Arada)
================================================================================

# 1. Proje dizinine git
cd /Users/onurcangunel/Desktop/KARGANOT

# 2. Script'lere çalıştırma izni ver
chmod +x scripts/install.sh scripts/dev.sh scripts/setup.sh

# 3. Kurulumu başlat
./scripts/install.sh

# 4. Development serverları başlat
npm run dev

================================================================================
## 📝 ADIM ADIM KURULUM
================================================================================

### Adım 1: Proje Dizinine Git
cd /Users/onurcangunel/Desktop/KARGANOT

### Adım 2: Environment Dosyası
cp .env.example .env

### Adım 3: Root Dependencies
npm install --legacy-peer-deps

### Adım 4: Frontend Dependencies
cd apps/web
npm install --legacy-peer-deps
cd ../..

### Adım 5: Backend Dependencies
cd apps/api
npm install --legacy-peer-deps
cd ../..

### Adım 6: Docker Başlat
docker-compose up -d

# Docker durumu kontrol et
docker ps

# Logları izle (opsiyonel)
docker-compose logs -f postgres

### Adım 7: Database Hazırlığı (10 saniye bekle)
sleep 10

### Adım 8: Prisma Setup
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ../..

================================================================================
## 🚀 PROJEYI ÇALIŞTIR
================================================================================

### SEÇENEK 1: Tek Komut (Önerilen)
npm run dev

### SEÇENEK 2: Script ile
chmod +x scripts/dev.sh
./scripts/dev.sh

### SEÇENEK 3: Ayrı Terminal'ler

# Terminal 1 - Backend
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api
npm run start:dev

# Terminal 2 - Frontend (yeni terminal aç)
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web
npm run dev

================================================================================
## 🔧 YARDIMCI KOMUTLAR
================================================================================

### Docker Yönetimi
docker-compose up -d          # Başlat
docker-compose down           # Durdur
docker-compose restart        # Yeniden başlat
docker-compose logs -f        # Logları izle
docker-compose ps             # Durum kontrol

### Database Yönetimi
cd apps/api
npx prisma studio            # Database GUI (port 5555)
npx prisma migrate dev       # Yeni migration
npx prisma migrate reset     # Database reset
npx prisma db seed           # Seed data ekle
npx prisma generate          # Client yenile

### Temizlik ve Yeniden Kurulum
# Tüm node_modules'leri temizle
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/package-lock.json
rm -rf apps/api/node_modules apps/api/package-lock.json

# Yeniden kur
npm install --legacy-peer-deps
cd apps/web && npm install --legacy-peer-deps && cd ../..
cd apps/api && npm install --legacy-peer-deps && cd ../..

### Build Komutları
npm run build              # Tümünü build et
npm run build:web         # Sadece frontend
npm run build:api         # Sadece backend

### Test Komutları
npm test                  # Tüm testler
npm run test:web         # Frontend testleri
npm run test:api         # Backend testleri

================================================================================
## 🌐 ERİŞİM ADRESLERİ
================================================================================

Frontend:       http://localhost:3000
Backend API:    http://localhost:4000/api
API Docs:       http://localhost:4000/api/docs
Prisma Studio:  http://localhost:5555
MailHog:        http://localhost:8025
MinIO Console:  http://localhost:9001

Database:       localhost:5432
  User:         karganot
  Password:     karganot123
  Database:     karganot

================================================================================
## 👤 TEST KULLANICILAR
================================================================================

Admin:
  Email:    admin@karganot.com
  Şifre:    Admin123!

Öğrenci:
  Email:    student@test.com
  Şifre:    Student123!

================================================================================
## ❌ SORUN GİDERME
================================================================================

### Port 3000 kullanımda ise:
cd apps/web
npm run dev -- -p 3001

### Port 4000 kullanımda ise:
# .env dosyasında PORT=4001 yapın

### Docker çalışmıyor:
docker-compose down
docker system prune -a
docker-compose up -d

### Prisma hatası:
cd apps/api
rm -rf node_modules
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate reset

### "Cannot find module" hatası:
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

================================================================================
## 📊 DEVELOPMENT WORKFLOW
================================================================================

1. Her gün başlarken:
   docker-compose up -d
   npm run dev

2. Database değişikliği yapınca:
   cd apps/api
   npx prisma migrate dev --name degisiklik_adi
   npx prisma generate

3. Yeni package eklerken:
   npm install paket-adi --legacy-peer-deps

4. Git commit öncesi:
   npm run lint
   npm test

5. Gün sonunda:
   Ctrl+C (serverları durdur)
   docker-compose down (opsiyonel)

================================================================================

🎉 Başarılar! Sorularınız için: destek@karganot.com

================================================================================
