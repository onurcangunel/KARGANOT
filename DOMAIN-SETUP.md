# 🌐 KARGANOT.COM - Domain Yapılandırma Rehberi

Bu rehber, karganot.com domain'ini projenize bağlamak için gereken tüm adımları içerir.

## 📋 Genel Bakış

- **Domain:** karganot.com
- **Frontend:** Vercel (https://karganot.com)
- **Backend API:** Railway (https://api.karganot.com)
- **Admin Panel:** Vercel (https://admin.karganot.com)

---

## 1️⃣ Domain Sağlayıcı DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, Cloudflare, vb.) şu DNS kayıtlarını ekleyin:

### A Records
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 (otomatik)
```

### CNAME Records
```
# WWW redirect
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600

# API subdomain
Type: CNAME
Name: api
Value: [railway-url].up.railway.app
TTL: 600

# Admin subdomain
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 600
```

### TXT Records (Email için - opsiyonel)
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
TTL: 600
```

---

## 2️⃣ Vercel Domain Bağlama (Frontend)

### Adım 1: Vercel'e Deploy
```bash
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web

# Vercel CLI install (eğer yoksa)
npm install -g vercel

# Deploy
vercel --prod
```

### Adım 2: Vercel Dashboard'da Domain Ekle

1. https://vercel.com adresine git
2. Projenizi seçin
3. **Settings** → **Domains** → **Add Domain**
4. `karganot.com` ekleyin
5. `www.karganot.com` ekleyin (auto-redirect to non-www)
6. `admin.karganot.com` ekleyin

### Adım 3: Environment Variables
Vercel Dashboard → **Settings** → **Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://api.karganot.com/api
NEXT_PUBLIC_APP_URL=https://karganot.com
NEXTAUTH_SECRET=[random-string-buraya]
NEXTAUTH_URL=https://karganot.com
```

**Random Secret Oluşturma:**
```bash
openssl rand -base64 32
```

---

## 3️⃣ Railway Domain Bağlama (Backend)

### Adım 1: Railway'e Deploy
```bash
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api

# Railway CLI install (eğer yoksa)
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Adım 2: Railway Dashboard'da Domain Ekle

1. https://railway.app adresine git
2. Projenizi seçin
3. **Settings** → **Networking** → **Custom Domain**
4. `api.karganot.com` ekleyin

### Adım 3: Railway'den CNAME Value'yu Kopyala

Railway size şöyle bir CNAME verecek:
```
your-project-name-production.up.railway.app
```

Bu değeri DNS ayarlarınızdaki `api` CNAME record'una yapıştırın.

### Adım 4: Environment Variables
Railway Dashboard → **Variables**

```env
DATABASE_URL=[railway-postgresql-url]
REDIS_URL=[railway-redis-url]
JWT_SECRET=[random-string-buraya]
FRONTEND_URL=https://karganot.com

AWS_ACCESS_KEY_ID=[aws-key]
AWS_SECRET_ACCESS_KEY=[aws-secret]
AWS_S3_BUCKET=karganot-files

IYZICO_API_KEY=[iyzico-key]
IYZICO_SECRET_KEY=[iyzico-secret]
IYZICO_BASE_URL=https://api.iyzipay.com

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=[sendgrid-api-key]
```

---

## 4️⃣ Database Setup (Railway PostgreSQL)

### Adım 1: PostgreSQL Ekle
Railway Dashboard → **New** → **Database** → **PostgreSQL**

### Adım 2: Connection String'i Kopyala
Railway otomatik olarak `DATABASE_URL` environment variable'ı oluşturur.

### Adım 3: Migration Çalıştır
```bash
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api

# Production database URL ile migrate et
DATABASE_URL="[railway-postgresql-url]" npx prisma migrate deploy

# Seed data (opsiyonel)
DATABASE_URL="[railway-postgresql-url]" npx prisma db seed
```

---

## 5️⃣ Redis Setup (Railway)

### Railway Dashboard → **New** → **Database** → **Redis**
Otomatik olarak `REDIS_URL` oluşturulur.

---

## 6️⃣ File Storage (AWS S3)

### Adım 1: S3 Bucket Oluştur
```bash
# AWS CLI ile
aws s3 mb s3://karganot-files

# Public access disabled (güvenlik)
aws s3api put-public-access-block \
  --bucket karganot-files \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Adım 2: CORS Ayarla
`cors.json` oluştur:
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://karganot.com", "https://api.karganot.com"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Uygula:
```bash
aws s3api put-bucket-cors --bucket karganot-files --cors-configuration file://cors.json
```

### Adım 3: IAM User Oluştur
AWS Console → IAM → Users → Create User
- Permissions: `AmazonS3FullAccess`
- Access keys oluştur
- Keys'i Railway environment'a ekle

---

## 7️⃣ Email Setup (SendGrid)

### Adım 1: SendGrid Hesabı
1. https://sendgrid.com adresine git
2. Hesap oluştur (ücretsiz 100 email/day)

### Adım 2: Domain Verify
1. SendGrid → **Settings** → **Sender Authentication**
2. `karganot.com` domain'ini verify et
3. SendGrid'in verdiği DNS kayıtlarını ekle

### Adım 3: API Key Oluştur
1. SendGrid → **Settings** → **API Keys**
2. Full Access API Key oluştur
3. Railway environment'a `SMTP_PASS` olarak ekle

---

## 8️⃣ SSL Sertifikası (Otomatik)

Vercel ve Railway otomatik olarak Let's Encrypt SSL sertifikası sağlar.

### Kontrol:
```bash
# SSL kontrol
curl -I https://karganot.com
curl -I https://api.karganot.com

# Detaylı SSL bilgisi
openssl s_client -connect karganot.com:443 -servername karganot.com
```

---

## 9️⃣ DNS Propagation Kontrolü

DNS değişiklikleri 24-48 saat sürebilir.

### Kontrol Araçları:
```bash
# Terminal
dig karganot.com
dig api.karganot.com
nslookup karganot.com

# Online Tools
https://dnschecker.org
https://www.whatsmydns.net
```

### Beklenen Sonuçlar:
```bash
# karganot.com → Vercel IP
dig karganot.com +short
# 76.76.21.21

# api.karganot.com → Railway CNAME
dig api.karganot.com +short
# your-project.up.railway.app
```

---

## 🔟 Test Checklist

Domain bağlandıktan sonra test edin:

### Frontend Tests
- [ ] https://karganot.com açılıyor
- [ ] https://www.karganot.com → https://karganot.com redirect
- [ ] SSL kilit ikonu görünüyor
- [ ] Login çalışıyor
- [ ] Registration çalışıyor

### Backend Tests
- [ ] https://api.karganot.com/api açılıyor
- [ ] https://api.karganot.com/api/docs Swagger açılıyor
- [ ] API endpoints çalışıyor
- [ ] Database bağlantısı OK
- [ ] Redis bağlantısı OK

### Integration Tests
- [ ] Frontend → Backend API calls çalışıyor
- [ ] File upload çalışıyor (S3)
- [ ] Email gönderimi çalışıyor (SendGrid)
- [ ] Payment test çalışıyor (iyzico sandbox)

### Test Komutları:
```bash
# Health check
curl https://api.karganot.com/api/health

# API test
curl https://api.karganot.com/api/universities

# CORS test
curl -H "Origin: https://karganot.com" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS https://api.karganot.com/api/notes
```

---

## 🚨 Sorun Giderme

### Domain açılmıyor
1. DNS propagation bekleyin (24-48 saat)
2. DNS cache temizleyin: `sudo dscacheutil -flushcache`
3. DNS kayıtları doğru mu kontrol edin
4. Vercel deployment başarılı mı kontrol edin

### SSL hatası
1. 24-48 saat bekleyin (otomatik sertifika)
2. Vercel/Railway dashboard kontrol edin
3. Mixed content hatası varsa HTTP → HTTPS redirect ekleyin

### API CORS hatası
```javascript
// apps/api/src/main.ts
app.enableCors({
  origin: [
    'https://karganot.com',
    'https://www.karganot.com',
    'https://admin.karganot.com'
  ],
  credentials: true,
});
```

### Email gönderilmiyor
1. SendGrid domain verify edildi mi?
2. API key doğru mu?
3. SendGrid günlük limit kontrolü
4. Spam klasörü kontrol edin

---

## 📊 Maliyet Tahmini

### Domain (Yıllık)
- .com domain: ~$12/yıl
- DNS: Ücretsiz

### Hosting
- **Vercel Hobby**: $0/ay (hobi projeler)
- **Vercel Pro**: $20/ay (önerilir)
- **Railway**: $5-20/ay (kullanıma göre)
- **PostgreSQL**: ~$5/ay
- **Redis**: ~$3/ay

### Services
- **AWS S3**: ~$1-5/ay (5GB storage)
- **SendGrid**: $0 (100 email/gün)
- **iyzico**: Commission based

**Toplam: ~$25-50/ay**

---

## 🎯 Production Deployment Komutu

Tek komutla production'a deploy:

```bash
cd /Users/onurcangunel/Desktop/KARGANOT

# Deploy script'i çalıştır
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

---

## 📞 Yardım

Sorularınız için:
- 📧 Email: destek@karganot.com
- 📚 Docs: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- 🚀 Deploy: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

**🎉 Başarılar! karganot.com artık canlı! 🚀**
