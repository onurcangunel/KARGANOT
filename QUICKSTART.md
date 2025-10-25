# KARGA NOT - Quick Start Guide

Bu rehber, KARGA NOT projesini hızlıca başlatmanız için gereken adımları içerir.

## 📋 Gereksinimler

Sisteminizde şunların yüklü olması gerekir:

- **Node.js** v18 veya üzeri
- **npm** v9 veya üzeri
- **Docker** & **Docker Compose**
- **Git**

## 🚀 Kurulum Adımları

### 1. Projeyi İndirin

```bash
cd /Users/onurcangunel/Desktop/KARGANOT
```

### 2. Dependencies Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını açın ve aşağıdaki değerleri güncelleyin:

```env
# Database
DATABASE_URL="postgresql://karganot:karganot123@localhost:5432/karganot"

# JWT
JWT_SECRET="your-random-secret-key-here-change-this"

# Frontend URL
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

### 4. Docker Servislerini Başlatın

```bash
npm run docker:up
```

Bu komut şunları başlatacak:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000, 9001)
- MailHog (port 1025, 8025)

### 5. Database Setup

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Frontend Dependencies

```bash
cd ../web
npm install
cd ../..
```

### 7. Development Serverları Başlatın

Yeni terminal pencerelerinde:

**Terminal 1 - Backend:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev:web
```

## ✅ Doğrulama

Tarayıcınızda şu adresleri ziyaret edin:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Docs (Swagger)**: http://localhost:4000/api/docs
- **MinIO Console**: http://localhost:9001 (user: karganot, pass: karganot123)
- **MailHog**: http://localhost:8025

## 📁 Proje Yapısı

```
KARGANOT/
├── apps/
│   ├── web/          # Next.js Frontend (port 3000)
│   └── api/          # NestJS Backend (port 4000)
├── docs/             # Dokümantasyon
├── scripts/          # Utility scripts
└── docker-compose.yml
```

## 🔧 Yararlı Komutlar

### Development

```bash
# Her iki servisi birlikte başlat
npm run dev

# Sadece frontend
npm run dev:web

# Sadece backend
npm run dev:api
```

### Database

```bash
# Prisma Studio (database GUI)
cd apps/api && npx prisma studio

# Migration oluştur
cd apps/api && npx prisma migrate dev --name migration_name

# Database reset
cd apps/api && npx prisma migrate reset
```

### Docker

```bash
# Servisleri başlat
npm run docker:up

# Servisleri durdur
npm run docker:down

# Logları görüntüle
npm run docker:logs
```

### Testing

```bash
# Tüm testleri çalıştır
npm test

# Frontend testleri
npm run test:web

# Backend testleri
npm run test:api
```

### Build

```bash
# Production build
npm run build

# Sadece frontend
npm run build:web

# Sadece backend
npm run build:api
```

## 📝 İlk Adımlar

### 1. Admin Kullanıcı Oluşturun

Backend başladıktan sonra, Swagger UI'da (http://localhost:4000/api/docs) şu endpoint'i kullanın:

```
POST /api/auth/register
{
  "email": "admin@karganot.com",
  "name": "Admin User",
  "password": "Admin123!",
  "university": "Test University"
}
```

Ardından database'de kullanıcının role'ünü ADMIN yapın:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@karganot.com';
```

### 2. Test Üniversitesi Oluşturun

Swagger UI'dan veya Prisma Studio'dan test üniversitesi ekleyin.

### 3. Not Yükleyin

Frontend'de (http://localhost:3000):
1. Kayıt olun / Giriş yapın
2. "Not Yükle" butonuna tıklayın
3. Ders bilgilerini doldurun
4. PDF dosyanızı yükleyin

### 4. Not Onaylayın

Admin panelinden (http://localhost:3000/admin):
1. Admin kullanıcısıyla giriş yapın
2. Bekleyen notları görün
3. Notu onaylayın

## 🐛 Sorun Giderme

### Port Çakışması

Eğer portlar kullanımda ise, `.env` dosyasında portları değiştirin:

```env
PORT=4001  # Backend için
```

Frontend için `apps/web/package.json`:
```json
"dev": "next dev -p 3001"
```

### Database Bağlantı Hatası

```bash
# Docker container'ların çalıştığından emin olun
docker ps

# PostgreSQL loglarını kontrol edin
docker logs karganot-postgres
```

### Prisma Client Güncel Değil

```bash
cd apps/api
npx prisma generate
```

### Node Modules Sorunu

```bash
# Root
rm -rf node_modules package-lock.json
npm install

# Frontend
cd apps/web
rm -rf node_modules package-lock.json
npm install

# Backend
cd ../api
rm -rf node_modules package-lock.json
npm install
```

## 📚 Daha Fazla Bilgi

- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Security Guide](./SECURITY.md)

## 💡 Öneriler

1. **VSCode Extensions**:
   - Prisma
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

2. **Chrome Extensions**:
   - React Developer Tools
   - Redux DevTools

3. **Database Tool**:
   - Prisma Studio (built-in)
   - DBeaver
   - pgAdmin

## 🎉 Tebrikler!

KARGA NOT artık çalışıyor! Geliştirmeye başlayabilirsiniz.

Sorularınız için: destek@karganot.com
