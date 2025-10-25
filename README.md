# 🎓 KARGA NOT - Türkiye Not Paylaşım Platformu

**karganot.com** - Üniversite öğrencilerinin ders notlarını güvenli şekilde alıp satabileceği platform

## 📋 Proje Hakkında

KARGA NOT, Türk üniversite öğrencilerinin kaliteli ders notlarına erişmesini ve kendi notlarını monetize etmesini sağlayan bir marketplace platformudur.

### Temel Özellikler
- ✅ Güvenli not alım-satımı
- ✅ 100+ Türk üniversitesi desteği
- ✅ iyzico ile Türk Lirası ödemeler
- ✅ Akıllı not görüntüleyici (watermark korumalı)
- ✅ İçerik moderasyonu
- ✅ Satıcı dashboard ve raporlama

### Hedefler
- 🎯 İlk 6 ayda 10K kullanıcı
- 💰 Aylık 50K TL GMV
- 📈 %15 platform komisyonu

## 🛠 Teknoloji Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Auth**: NextAuth.js
- **State**: React Context + SWR

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Storage**: AWS S3

### Payments
- **Primary**: iyzico (Türkiye)
- **Backup**: Stripe

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Railway PostgreSQL
- **Storage**: AWS S3 / Cloudflare R2

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### 1. Projeyi Klonla
```bash
git clone https://github.com/yourusername/karga-not.git
cd karga-not
```

### 2. Dependencies Yükle
```bash
npm install
```

### 3. Environment Variables
```bash
cp .env.example .env
# .env dosyasını düzenle
```

### 4. Docker ile Database Başlat
```bash
docker-compose up -d
```

### 5. Database Migration
```bash
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

### 6. Development Servisleri Başlat
```bash
# Terminal 1 - Frontend
cd apps/web
npm run dev

# Terminal 2 - Backend
cd apps/api
npm run start:dev
```

Uygulama şu adreslerde çalışacak:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api

## 📁 Proje Yapısı

```
karga-not/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
├── docs/                 # Dokümantasyon
├── scripts/              # Deployment scripts
├── docker-compose.yml    # Local development
└── package.json          # Monorepo root
```

## 🔑 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/karganot
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
AWS_S3_BUCKET=karganot-files
IYZICO_API_KEY=your-iyzico-key
IYZICO_SECRET_KEY=your-iyzico-secret
```

## 📚 API Dokümantasyonu

API dokümantasyonuna şuradan erişebilirsiniz:
- Swagger UI: http://localhost:4000/api
- [API.md](./docs/API.md)

## 🔒 Güvenlik

- ✅ JWT token authentication
- ✅ Role-based access control (RBAC)
- ✅ Rate limiting
- ✅ SQL injection koruması (Prisma ORM)
- ✅ XSS koruması
- ✅ CSRF koruması
- ✅ File upload validation
- ✅ Dynamic watermarking
- ✅ KVKK uyumlu veri işleme

## 📄 Yasal Uyumluluk

- [Kullanım Şartları](./docs/legal/terms-of-service.md)
- [Gizlilik Politikası](./docs/legal/privacy-policy.md)
- [İçerik Politikası](./docs/legal/content-policy.md)
- KVKK Uyumluluk

## 🚢 Deployment

### Production Build
```bash
# Frontend
cd apps/web
npm run build

# Backend
cd apps/api
npm run build
```

### Vercel (Frontend)
```bash
vercel --prod
```

### Railway (Backend)
```bash
railway up
```

Detaylı deployment talimatları: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🧪 Test

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 📊 Monitoring

- **Error Tracking**: Sentry
- **Analytics**: Google Analytics + Mixpanel
- **Uptime**: UptimeRobot
- **Performance**: Vercel Analytics

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje özel mülkiyettir. Tüm hakları saklıdır.

## 📧 İletişim

- Website: https://karganot.com
- Email: info@karganot.com
- Support: destek@karganot.com

## 🙏 Teşekkürler

KARGA NOT'u kullandığınız için teşekkürler! 🎓

---

**Made with ❤️ in Turkey**
