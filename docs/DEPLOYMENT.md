# Deployment Configuration

## Production URLs
- **Domain**: https://karganot.com
- **API**: https://api.karganot.com
- **Admin**: https://admin.karganot.com

## Vercel Deployment (Frontend)

### 1. Vercel CLI Kurulumu
```bash
npm i -g vercel
```

### 2. Frontend Deploy
```bash
cd apps/web
vercel --prod
```

### 3. Environment Variables (Vercel Dashboard)
```env
NEXT_PUBLIC_API_URL=https://api.karganot.com/api
NEXT_PUBLIC_APP_URL=https://karganot.com
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://karganot.com
```

### 4. Domain Ayarları

Vercel Dashboard'da:
1. Project Settings → Domains
2. "karganot.com" ekle
3. "www.karganot.com" ekle (redirect)

DNS ayarları (domain sağlayıcınızda):
```
A Record:
Name: @
Value: 76.76.21.21 (Vercel IP)

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

## Railway Deployment (Backend)

### 1. Railway CLI Kurulumu
```bash
npm i -g @railway/cli
```

### 2. Railway Login
```bash
railway login
```

### 3. Backend Deploy
```bash
cd apps/api
railway init
railway up
```

### 4. Environment Variables (Railway Dashboard)
```env
DATABASE_URL=postgresql://user:pass@host:5432/karganot
REDIS_URL=redis://host:6379
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://karganot.com
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=karganot-files
IYZICO_API_KEY=your-iyzico-key
IYZICO_SECRET_KEY=your-iyzico-secret
IYZICO_BASE_URL=https://api.iyzipay.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-key
```

### 5. Custom Domain (Railway)

Railway Dashboard'da:
1. Settings → Domains
2. Custom Domain ekle: api.karganot.com

DNS ayarları:
```
CNAME Record:
Name: api
Value: your-app.up.railway.app
```

## Domain DNS Yapılandırması (Tam Liste)

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) şu kayıtları ekleyin:

### A Records
```
@ (root)        →  76.76.21.21  (Vercel)
```

### CNAME Records
```
www             →  cname.vercel-dns.com
api             →  your-backend.up.railway.app
admin           →  cname.vercel-dns.com
```

### TXT Records (Email için)
```
@               →  v=spf1 include:sendgrid.net ~all
```

## SSL Sertifikası

Her iki platform da otomatik SSL sağlar:
- ✅ Vercel: Let's Encrypt (otomatik)
- ✅ Railway: Let's Encrypt (otomatik)

## Database (Railway PostgreSQL)

Railway Dashboard'da:
1. New → Database → PostgreSQL
2. Environment variables otomatik eklenir
3. Connection string'i kopyalayın

```bash
# Migration çalıştır
cd apps/api
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

## Redis (Railway)

Railway Dashboard'da:
1. New → Database → Redis
2. REDIS_URL otomatik eklenir

## File Storage (AWS S3)

### S3 Bucket Oluşturma
```bash
# AWS CLI ile
aws s3 mb s3://karganot-files
aws s3api put-bucket-cors --bucket karganot-files --cors-configuration file://cors.json
```

cors.json:
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://karganot.com"],
      "AllowedMethods": ["GET", "PUT", "POST"],
      "AllowedHeaders": ["*"]
    }
  ]
}
```

## Email (SendGrid)

1. SendGrid hesabı oluştur
2. API Key al
3. Domain verify et: karganot.com
4. SMTP credentials ekle environment'a

## Monitoring

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs @sentry/node
```

Environment:
```env
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_DSN=https://...
```

### Google Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## CI/CD (GitHub Actions)

`.github/workflows/deploy.yml` oluşturun:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd apps/web && npm ci
      - run: cd apps/web && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/web

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd apps/api && npm ci
      - run: cd apps/api && npm run build
      - uses: bervProject/railway-deploy@v1.0.5
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: api
```

## Deployment Checklist

### Öncesi
- [ ] .env.production dosyaları hazır
- [ ] Database backup alındı
- [ ] API keys kontrol edildi
- [ ] Domain DNS ayarları yapıldı

### Deployment
- [ ] Frontend Vercel'e deploy edildi
- [ ] Backend Railway'e deploy edildi
- [ ] Database migrate edildi
- [ ] Environment variables set edildi

### Sonrası
- [ ] SSL sertifikası aktif
- [ ] Domain'ler çalışıyor
- [ ] API endpoints test edildi
- [ ] Email gönderimi test edildi
- [ ] File upload test edildi
- [ ] Payment test edildi

## Domain Propagation

DNS değişiklikleri 24-48 saat sürebilir. Kontrol:
```bash
dig karganot.com
dig api.karganot.com
nslookup karganot.com
```

## Troubleshooting

### Domain çalışmıyor
1. DNS propagation bekleyin (24-48 saat)
2. DNS kayıtları doğru mu kontrol edin
3. SSL sertifikası aktif mi kontrol edin

### API bağlantı hatası
1. CORS ayarları kontrol edin
2. Environment variables doğru mu
3. Backend health check: https://api.karganot.com/api/health

### Database bağlantı hatası
1. DATABASE_URL doğru mu
2. IP whitelist kontrol edin
3. Railway logs kontrol edin

## Maliyetler

### Vercel (Frontend)
- Hobby: $0/mo (hobby projeler için)
- Pro: $20/mo (önerilir)

### Railway (Backend + DB)
- $5/mo - $20/mo arası (kullanıma göre)
- PostgreSQL: ~$5/mo
- Redis: ~$3/mo

### AWS S3
- İlk 5GB: $0.023/GB
- Transfer: $0.09/GB

### SendGrid (Email)
- 100 email/gün: Ücretsiz
- 40K email/ay: $15/mo

**Toplam Tahmini: $25-45/ay**

## Production URLs

Deploy sonrası erişim:
- 🌐 https://karganot.com
- 🔧 https://api.karganot.com/api
- 📚 https://api.karganot.com/api/docs
- 👨‍💼 https://admin.karganot.com
