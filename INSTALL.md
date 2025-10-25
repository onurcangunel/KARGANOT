# 🚀 KARGA NOT - Hızlı Kurulum

## Otomatik Kurulum (Önerilen)

Terminal'de projenin root dizininde:

```bash
chmod +x scripts/install.sh
./scripts/install.sh
```

Bu script otomatik olarak:
- ✅ Node.js ve Docker kontrolü yapar
- ✅ Tüm dependencies'leri yükler
- ✅ Docker servislerini başlatır
- ✅ Database'i oluşturur ve migrate eder
- ✅ Test verilerini ekler

## Manuel Kurulum

### 1. Dependencies Yükle

```bash
# Root
npm install --legacy-peer-deps

# Frontend
cd apps/web
npm install --legacy-peer-deps

# Backend
cd ../api
npm install --legacy-peer-deps
cd ../..
```

### 2. Environment Setup

```bash
cp .env.example .env
```

### 3. Docker Başlat

```bash
docker-compose up -d
```

### 4. Database Setup

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
```

## 🎯 Projeyi Çalıştır

### Seçenek 1: Script ile (Kolay)

```bash
chmod +x scripts/dev.sh
./scripts/dev.sh
```

### Seçenek 2: Tek komutla

```bash
npm run dev
```

### Seçenek 3: Ayrı terminal'lerde

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

## 🌐 Erişim Adresleri

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Docs (Swagger)**: http://localhost:4000/api/docs
- **MailHog**: http://localhost:8025
- **MinIO Console**: http://localhost:9001

## 👤 Test Kullanıcılar

Database seed sonrası otomatik oluşturulur:

### Admin
- Email: `admin@karganot.com`
- Şifre: `Admin123!`

### Öğrenci
- Email: `student@test.com`
- Şifre: `Student123!`

## ❌ Sorun mu var?

### Port çakışması
```bash
# Backend portunu değiştir (.env)
PORT=4001

# Frontend portunu değiştir
cd apps/web
npm run dev -- -p 3001
```

### Docker çalışmıyor
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Prisma hatası
```bash
cd apps/api
npx prisma generate
npx prisma migrate reset
```

### Node modules hatası
```bash
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/package-lock.json
rm -rf apps/api/node_modules apps/api/package-lock.json
npm install --legacy-peer-deps
cd apps/web && npm install --legacy-peer-deps
cd ../api && npm install --legacy-peer-deps
```

## 📚 Daha Fazla Bilgi

- [Detaylı Dokümantasyon](./README.md)
- [API Dokümantasyonu](./docs/API.md)
- [Başlangıç Rehberi](./QUICKSTART.md)

---

**Başarılar! 🎉**
