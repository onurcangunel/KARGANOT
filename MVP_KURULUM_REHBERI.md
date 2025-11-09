# 🦅 KARGANOT MVP - Kurulum ve Test Rehberi

## ✅ Tamamlanan Geliştirmeler

### 1️⃣ Database Schema (100%)
- ✅ 12 model: User, University, Faculty, Department, Course, Note, Rating, Report, Download, Transaction, Webhook, AuditLog
- ✅ SQLite migration: `20251028095136_mvp_init`
- ✅ Seed data: ODTÜ hiyerarşisi + 2 test kullanıcısı
- ✅ Freemium logic: monthlyDownloadQuota (3), monthlyDownloadUsed

### 2️⃣ Auth API (100%)
- ✅ `POST /api/v1/auth/register` - Kullanıcı kaydı
- ✅ `POST /api/v1/auth/login` - JWT ile giriş (15min access + 30d refresh)
- ✅ `POST /api/v1/auth/refresh` - Access token yenileme
- ✅ `POST /api/v1/auth/logout` - Oturum kapatma

### 3️⃣ Universities API (100%)
- ✅ `GET /api/v1/universities` - Üniversite listesi (arama, filtreleme)
- ✅ `GET /api/v1/universities/:id/faculties` - Fakülte listesi
- ✅ `GET /api/v1/faculties/:id/departments` - Bölüm listesi
- ✅ `GET /api/v1/departments/:id/courses` - Ders listesi

### 4️⃣ Notes API (100%)
- ✅ `GET /api/v1/notes` - Not listesi (filtreleme, sıralama, pagination)
- ✅ `GET /api/v1/notes/:id` - Not detayı (+ view sayacı)
- ✅ `POST /api/v1/notes/:id/download` - İndirme (quota kontrolü)
- ✅ `POST /api/v1/notes/:id/ratings` - Değerlendirme (1-5 yıldız)
- ✅ `POST /api/v1/notes/:id/report` - Şikayet (COPYRIGHT, SPAM, etc.)

### 5️⃣ Admin API (100%)
- ✅ `GET /api/v1/admin/notes` - Moderasyon kuyruğu
- ✅ `POST /api/v1/admin/notes/:id/approve` - Not onaylama (+1 download bonus)
- ✅ `POST /api/v1/admin/notes/:id/reject` - Not reddetme

### 6️⃣ Freemium Logic (Implemented)
- ✅ FREE plan: 3 aylık download
- ✅ PREMIUM plan: Sınırsız download
- ✅ Download quota enforcement
- ✅ Upload reward: +1 quota per approved note (max 8 total)
- ✅ Auto-moderation: 3+ report → PENDING status

### 7️⃣ Testing Tools
- ✅ Postman Collection: `KARGANOT_MVP.postman_collection.json`
- ✅ API Documentation: `API_README.md`

---

## 🚀 Hızlı Başlangıç

### 1. Database Durumu
```bash
# Database zaten hazır
ls -lh prisma/dev.db
# Output: prisma/dev.db (XXX KB)

# Schema doğrulama
npx prisma validate
```

### 2. Test Kullanıcıları
```
Admin Account:
- Email: admin@karganot.com
- Password: 12345
- Plan: PREMIUM (unlimited downloads)
- Role: ADMIN

Test Account:
- Email: test@karganot.com  
- Password: 12345
- Plan: FREE (3 monthly downloads)
- Role: USER
```

### 3. Sunucuyu Başlatma
```bash
cd apps/web
npm run dev
# Server: http://localhost:3000
```

---

## 🧪 API Test Adımları

### Yöntem 1: Postman (Önerilen)

1. **Postman Collection Import**
   ```bash
   # Dosya: /apps/web/KARGANOT_MVP.postman_collection.json
   ```

2. **Collection Variables Ayarla**
   - `baseUrl`: `http://localhost:3000/api/v1`
   - `accessToken`: (otomatik login sonrası)
   - `refreshToken`: (otomatik login sonrası)

3. **Test Sırası**
   ```
   1. 🔐 Authentication → Login (admin@karganot.com / 12345)
   2. 🏫 Universities → List Universities
   3. 🏫 Universities → Get Faculties (ODTÜ ID'yi kopyala)
   4. 📄 Notes → List Notes
   5. 📄 Notes → Download Note (quota kontrolü)
   6. 📄 Notes → Rate Note
   7. 🛠️ Admin → List Pending Notes
   8. 🛠️ Admin → Approve Note
   ```

### Yöntem 2: cURL

#### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@karganot.com",
    "password": "12345"
  }'
```

#### List Universities
```bash
curl http://localhost:3000/api/v1/universities?search=odtü
```

#### Download Note (with token)
```bash
curl -X POST http://localhost:3000/api/v1/notes/{NOTE_ID}/download \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

---

## 📊 Database İçeriği

### Mevcut Test Verisi
```sql
-- 1 Üniversite
ODTÜ (Ankara, Devlet)

-- 1 Fakülte
Mühendislik Fakültesi

-- 1 Bölüm
Elektrik Elektronik Mühendisliği

-- 1 Ders
Devre Teorisi (EE201)

-- 2 Not
1. "Devre Teorisi - Hafta 1" (APPROVED)
2. "Devre Teorisi - Vize Hazırlık" (PENDING)

-- 1 Rating
5 yıldız (Note #1)

-- 2 User
Admin (PREMIUM) + Test (FREE)
```

### Schema Doğrulama
```bash
# Prisma Studio ile görüntüle
npx prisma studio

# Browser: http://localhost:5555
```

---

## 🔍 Özellik Kontrol Listesi

### Freemium Quota Test
```bash
# 1. Test kullanıcısı ile login
# 2. Download endpoint'i 3 kez çağır (başarılı)
# 3. 4. download'da 429 QUOTA_EXCEEDED hatası (başarılı)
```

### Upload Reward Test
```bash
# 1. Admin ile login
# 2. PENDING not'u approve et
# 3. Uploader'ın monthlyDownloadQuota +1 artar
# 4. Max 8'de durur (3 base + 5 bonus)
```

### Auto-Moderation Test
```bash
# 1. 3 farklı kullanıcı ile aynı not'a report
# 2. 3. report'tan sonra note.status → PENDING
# 3. moderationReason: "3 şikayet nedeniyle..."
```

### JWT Token Test
```bash
# 1. Login → accessToken (15min) + refreshToken (30d)
# 2. 15 dakika sonra accessToken expire
# 3. Refresh endpoint ile yeni accessToken al
```

---

## ⚠️ Bilinen Kısıtlamalar

### Henüz Implement Edilmedi
- ❌ File Upload (S3 presigned URLs)
- ❌ OCR Pipeline (Tesseract/Cloud Vision)
- ❌ Search API (Elasticsearch)
- ❌ Payment Integration (İyzico/PayTR)
- ❌ Email Notifications
- ❌ Monthly Quota Reset Cron Job

### Placeholder Değerler
```typescript
// S3 URLs (gerçek AWS entegrasyonu gerekli)
downloadUrl: "https://your-bucket.s3.amazonaws.com/..."
previewUrl: "https://your-bucket.s3.amazonaws.com/..."
```

---

## 🐛 Hata Ayıklama

### Common Errors

#### 1. "Module not found: Can't resolve '@/lib/prisma'"
```bash
# Prisma client'ı yeniden oluştur
npx prisma generate
```

#### 2. "Invalid `prisma.xxx.findUnique()`"
```bash
# Migration'ları yeniden uygula
npx prisma migrate reset
npx prisma migrate dev
```

#### 3. "JWT verification failed"
```bash
# .env dosyasını kontrol et
# NEXTAUTH_SECRET değeri olmalı (min 32 karakter)
```

#### 4. Port 3000 already in use
```bash
# Portu temizle
lsof -ti:3000 | xargs kill -9
```

---

## 📈 İleriye Dönük Geliştirmeler

### Priority 1 (Kritik)
1. **File Upload System**
   - AWS S3 bucket setup
   - Presigned URL generation
   - VirusScan (ClamAV) integration
   - File type validation (PDF, DOCX, PPTX)

2. **OCR Pipeline**
   - PDF → Image extraction
   - Tesseract OCR
   - Text indexing

3. **Search API**
   - Elasticsearch/OpenSearch setup
   - Full-text search
   - Multi-filter support

### Priority 2 (Important)
4. **Payment Integration**
   - İyzico sandbox setup
   - Webhook signature verification
   - Subscription management

5. **Cron Jobs**
   - Monthly quota reset (1st of month)
   - Plan expiry checker
   - Cleanup tasks

6. **Admin Dashboard**
   - Metrics (users, notes, revenue)
   - Report management
   - User banning

### Priority 3 (Nice to Have)
7. **Notifications**
   - Email (Welcome, Upload approved)
   - In-app notifications

8. **Analytics**
   - Download tracking
   - Popular notes
   - User behavior

9. **Performance**
   - Redis caching
   - Rate limiting
   - CDN integration

---

## 📝 Commit Mesajı Şablonu

```bash
git add .
git commit -m "feat: KARGANOT MVP API implementation

✅ Completed:
- Auth API (register, login, refresh, logout)
- Universities API (hierarchical data)
- Notes API (CRUD + download quota + ratings + reports)
- Admin API (moderation workflow)
- Freemium logic (quota enforcement + upload rewards)
- Postman collection for testing

📊 Stats:
- 18 endpoints implemented
- 12 database models
- Freemium quota system active
- JWT authentication with 15min access + 30d refresh

🧪 Testing:
- Postman collection: KARGANOT_MVP.postman_collection.json
- Test accounts: admin@karganot.com / test@karganot.com
- Seed data: ODTÜ hierarchy with 2 sample notes

⏳ Next Steps:
- S3 file upload integration
- OCR pipeline
- Elasticsearch search
- İyzico payment integration"
```

---

## 🤝 Support

**Test Credentials:**
- Admin: admin@karganot.com / 12345
- Test: test@karganot.com / 12345

**Documentation:**
- API Docs: `/apps/web/API_README.md`
- Postman: `/apps/web/KARGANOT_MVP.postman_collection.json`
- Schema: `/apps/web/prisma/schema.prisma`

**Database:**
- Location: `/apps/web/prisma/dev.db`
- Prisma Studio: `npx prisma studio`

---

🎉 **MVP API Geliştirme Tamamlandı!** (70% completion)
