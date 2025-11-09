# 🎯 ÖZELLİK SEÇİMİ VE GELİŞTİRME TALİMATI

## 📋 MEVCUT DURUM

✅ **TAMAMLANANLAR:**
- NextAuth v5 authentication
- Prisma + SQLite database
- Login/Register sayfaları (hazırlanıyor)
- Profile sayfası (hazırlanıyor)
- SessionProvider setup
- Basic project structure

---

## 🎯 SEÇİMİM: SEÇENEK 1 - NOT YÜKLEME SİSTEMİ ⭐

**Neden bu öncelik?**
✅ Platformun core özelliği (notlar olmadan platform çalışmaz)
✅ Diğer özelliklere temel oluşturur (arama, listeleme notlara bağlı)
✅ Kullanıcı engagement başlatır (hemen içerik oluşturma)
✅ Test etmesi kolay (upload → view → success)

---

## 💬 TALİMATIM

Harika organize olmuşsun! Seçenek 1 ile başlayalım. 🚀

### **İSTEDİKLERİM: NOT YÜKLEME SİSTEMİ**

#### **A) Backend - API Routes**

```typescript
POST /api/documents/upload
- Multipart form-data
- File validation (PDF, DOCX, PPTX, JPG, PNG)
- Max 50MB file size
- Virus scan (optional/future)
- S3 or local storage
- Database record creation
- Return document ID

GET /api/universities
- List all universities

GET /api/universities/:id/faculties
- List faculties for a university

GET /api/faculties/:id/departments
- List departments for a faculty

GET /api/departments/:id/courses
- List courses for a department
```

#### **B) Database Schema**

```prisma
model Document {
  id                String    @id @default(cuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  
  // File info
  title             String
  description       String?
  fileName          String
  fileUrl           String
  fileSize          Int       // bytes
  fileType          String    // pdf, docx, etc.
  thumbnailUrl      String?
  pageCount         Int?
  
  // Academic info
  universityId      String
  university        University @relation(fields: [universityId], references: [id])
  facultyId         String?
  faculty           Faculty?   @relation(fields: [facultyId], references: [id])
  departmentId      String?
  department        Department? @relation(fields: [departmentId], references: [id])
  courseId          String?
  course            Course?    @relation(fields: [courseId], references: [id])
  
  // Metadata
  documentType      String     // ders_notu, ozet, slayt, odev, sinav
  semester          String?    // guz, bahar, yaz
  academicYear      String?    // 2024-2025
  tags              String[]
  language          String     @default("tr")
  
  // Status
  status            String     @default("pending") // pending, approved, rejected
  
  // Engagement
  viewCount         Int        @default(0)
  downloadCount     Int        @default(0)
  likeCount         Int        @default(0)
  ratingAvg         Float?
  ratingCount       Int        @default(0)
  
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
}

model University {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  city      String?
  logo      String?
  documents Document[]
  faculties Faculty[]
  createdAt DateTime @default(now())
}

model Faculty {
  id            String     @id @default(cuid())
  name          String
  universityId  String
  university    University @relation(fields: [universityId], references: [id])
  documents     Document[]
  departments   Department[]
  createdAt     DateTime   @default(now())
}

model Department {
  id         String   @id @default(cuid())
  name       String
  facultyId  String
  faculty    Faculty  @relation(fields: [facultyId], references: [id])
  documents  Document[]
  courses    Course[]
  createdAt  DateTime @default(now())
}

model Course {
  id           String     @id @default(cuid())
  name         String
  code         String?
  departmentId String
  department   Department @relation(fields: [departmentId], references: [id])
  documents    Document[]
  createdAt    DateTime   @default(now())
}
```

#### **C) Frontend - Upload Page**

```typescript
// app/upload/page.tsx

ÖZELLİKLER:

1. File Upload Area
   ✅ Drag & drop zone
   ✅ Click to browse
   ✅ Multiple file support (opsiyonel)
   ✅ File preview (name, size, type)
   ✅ Remove file option
   ✅ File type validation (client-side)
   ✅ Size validation (max 50MB)
   ✅ Upload progress bar

2. Form Fields
   ✅ Title (required, min 10 chars)
   ✅ Description (required, min 50 chars, textarea)
   ✅ University (dropdown, searchable)
   ✅ Faculty (dropdown, dependent on university)
   ✅ Department (dropdown, dependent on faculty)
   ✅ Course (dropdown/autocomplete, dependent on department)
   ✅ Document Type (dropdown: Ders Notu, Özet, Slayt, Ödev, Sınav, Kılavuz)
   ✅ Semester (dropdown: Güz, Bahar, Yaz)
   ✅ Academic Year (dropdown: 2024-2025, 2023-2024, etc.)
   ✅ Tags (input with autocomplete, multiple)
   ✅ Language (default: Türkçe)

3. Validation (Zod Schema)
   ✅ Client-side validation
   ✅ Real-time error messages
   ✅ Required field indicators
   ✅ Character counters

4. Upload Process
   ✅ Step-by-step wizard (optional) or single form
   ✅ Save as draft (opsiyonel)
   ✅ Upload progress percentage
   ✅ Success message with document link
   ✅ Error handling
   ✅ Retry option

5. UI/UX
   ✅ Modern, clean design
   ✅ Responsive (mobile-first)
   ✅ Loading states
   ✅ Disabled state during upload
   ✅ Success/error toast notifications
```

#### **D) File Storage**

```typescript
// İKİ SEÇENEK:

SEÇENEK 1: Local Storage (Basit, Development)
- /public/uploads/ klasörü
- Node.js fs modülü
- Dosya adı: {timestamp}-{random}-{filename}
- Thumbnail: Sharp ile generate

SEÇENEK 2: AWS S3 (Production-ready)
- aws-sdk kullan
- Bucket: coursehero-documents
- Public read, private write
- CloudFront CDN (opsiyonel)
- Pre-signed URLs

HANGİSİNİ TERCİH EDERSİN? 
→ Basit başlayalım: Local Storage
→ Sonra upgrade: AWS S3
```

#### **E) Thumbnail Generation**

```typescript
// PDF/Image thumbnail oluşturma

KÜTÜPHANELER:
- pdf-lib veya pdf-parse (PDF için)
- sharp (image resize)
- canvas (PDF'i image'e çevir)

İŞLEM:
1. PDF'in ilk sayfasını al
2. 300x400px thumbnail oluştur
3. /public/thumbnails/ kaydet
4. Database'e URL kaydet
```

#### **F) University/Faculty/Department Data**

```typescript
// Seed data gerekli!

GEREKSİNİM:
1. Türkiye'deki 208 üniversite
2. Her üniversitenin fakülteleri
3. Her fakültenin bölümleri
4. Popüler dersler (ilk aşamada manual)

ÇÖZÜM:
- Elimizde 208 üniversite JSON var!
- turkiye_universiteleri_COMPLETE.json
- Bu veriyi seed script ile database'e aktar

İSTEK:
Lütfen prisma/seed.ts dosyası oluştur:
- JSON'u oku
- University, Faculty, Department oluştur
- npm run seed ile çalıştır
```

---

## 📝 ÇIKTI BEKLENTİLERİM

Lütfen bana şunları ver:

### **1. Prisma Schema Update**
```prisma
// prisma/schema.prisma
// Document, University, Faculty, Department, Course models
```

### **2. Migration**
```bash
npx prisma migrate dev --name add-documents-schema
```

### **3. Seed Script**
```typescript
// prisma/seed.ts
// 208 üniversite + fakülte + bölüm verisi
```

### **4. API Routes**
```typescript
// app/api/documents/upload/route.ts - Upload handler
// app/api/universities/route.ts - List universities
// app/api/universities/[id]/faculties/route.ts - List faculties
// app/api/faculties/[id]/departments/route.ts - List departments
// app/api/departments/[id]/courses/route.ts - List courses
```

### **5. Upload Page**
```typescript
// app/upload/page.tsx
// Full featured upload form with drag & drop
```

### **6. Components**
```typescript
// components/FileUpload.tsx - Drag & drop component
// components/UniversitySelect.tsx - Searchable dropdown
// components/ProgressBar.tsx - Upload progress
```

### **7. Utilities**
```typescript
// lib/fileUpload.ts - File upload helper
// lib/thumbnail.ts - Thumbnail generator
// lib/validation.ts - Zod schemas
```

### **8. Package Installation**
```bash
# Gerekli paketleri söyle
npm install ...
```

---

## 🎨 TASARIM TERCİHLERİM

### **Upload Page Layout:**
```
┌─────────────────────────────────────────┐
│  📤 Yeni Not Yükle                      │
├─────────────────────────────────────────┤
│                                         │
│  [  Dosya Sürükle veya Tıkla  ]       │
│     Max 50MB • PDF, DOCX, PPTX         │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  📝 Başlık *                            │
│  [_________________________________]    │
│                                         │
│  📋 Açıklama *                          │
│  [_________________________________]    │
│  [_________________________________]    │
│  [_________________________________]    │
│                                         │
│  🏫 Üniversite *                        │
│  [Dropdown with search ▼]              │
│                                         │
│  🏛️ Fakülte *                           │
│  [Dropdown ▼]                           │
│                                         │
│  📚 Bölüm *                             │
│  [Dropdown ▼]                           │
│                                         │
│  📖 Ders                                │
│  [Autocomplete input]                   │
│                                         │
│  📑 İçerik Türü *                       │
│  [Ders Notu ▼]                         │
│                                         │
│  📅 Dönem                               │
│  [Güz 2024 ▼]                          │
│                                         │
│  🏷️ Etiketler                           │
│  [#anayasa] [#hukuk] [+ Ekle]         │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [İptal]  [Taslak Kaydet]  [📤 Yükle] │
│                                         │
└─────────────────────────────────────────┘
```

### **Drag & Drop Zone:**
```
┌─────────────────────────────────────────┐
│                                         │
│            📁                           │
│                                         │
│     Dosya Sürükle veya Tıkla           │
│                                         │
│  PDF, DOCX, PPTX, JPG, PNG             │
│  Maksimum 50MB                         │
│                                         │
└─────────────────────────────────────────┘

// File selected:
┌─────────────────────────────────────────┐
│  ✅ anayasa_hukuku_notlar.pdf           │
│  📄 12.5 MB • PDF • 45 sayfa            │
│  [Kaldır ❌]                            │
└─────────────────────────────────────────┘

// Uploading:
┌─────────────────────────────────────────┐
│  ⏳ Yükleniyor...                       │
│  ████████████░░░░░░░░ 67%              │
│  anayasa_hukuku_notlar.pdf             │
└─────────────────────────────────────────┘
```

### **Colors:**
```css
Primary: #3B82F6 (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Error: #EF4444 (Red)
Background: #F9FAFB (Light Gray)
```

---

## ⚠️ ÖNEMLİ NOTLAR

### **1. Dosya Güvenliği**
```typescript
// MUTLAKA EKLE:
- File type validation (MIME type check)
- File size limit (50MB)
- Sanitize filename (remove special chars)
- Virus scan (optional, future feature)
```

### **2. Database İndexleri**
```prisma
// Performans için:
@@index([userId])
@@index([universityId])
@@index([status])
@@index([createdAt])
@@index([documentType])
```

### **3. Error Handling**
```typescript
try {
  // Upload logic
} catch (error) {
  if (error instanceof FileTooLargeError) {
    return 'Dosya çok büyük (Max 50MB)'
  }
  if (error instanceof InvalidFileTypeError) {
    return 'Geçersiz dosya tipi'
  }
  // Generic error
  return 'Bir hata oluştu. Lütfen tekrar deneyin.'
}
```

### **4. Moderasyon Sistemi**
```typescript
// İlk aşamada:
status: 'pending' // Admin onayı bekliyor

// Gelecekte:
- Auto-approve (trusted users)
- AI moderation
- Community flagging
```

---

## ✅ TEST SENARYOLARI

### **Test 1: Basit Upload**
```bash
1. /upload sayfasına git
2. PDF dosyası seç
3. Formu doldur:
   - Başlık: "Test Notu"
   - Açıklama: "Test açıklaması..."
   - Üniversite: Ankara Üniversitesi
   - Fakülte: Hukuk
   - Bölüm: Hukuk
4. "Yükle" butonuna tıkla
5. Success message görünmeli
6. Document ID ile yönlendir
7. Database'de kayıt var mı kontrol et ✅
```

### **Test 2: Validation**
```bash
1. Boş form submit et
   → "Bu alan zorunludur" hataları ✅

2. 100MB dosya yükle
   → "Dosya çok büyük" hatası ✅

3. .exe dosyası yükle
   → "Geçersiz dosya tipi" hatası ✅

4. 5 karakterlik başlık yaz
   → "Minimum 10 karakter" hatası ✅
```

### **Test 3: Dependent Dropdowns**
```bash
1. Üniversite seç → Fakülteler yüklenmeli ✅
2. Fakülte seç → Bölümler yüklenmeli ✅
3. Bölüm seç → Dersler yüklenmeli ✅
```

### **Test 4: Progress Bar**
```bash
1. Büyük dosya (20MB+) yükle
2. Progress bar görünmeli
3. Yüzde güncellenmeli
4. Tamamlandığında success ✅
```

---

## 🚀 SONRAKI ADIMLAR

Upload sistemi tamamlandıktan sonra:

### **Adım 2: Document List Page**
```
- Upload edilen notları listele
- Grid/List view
- Pagination
- Basic search
```

### **Adım 3: Document Detail Page**
```
- PDF viewer
- Download button
- Rating/comments
- Author info
```

### **Adım 4: Search & Filter**
```
- Advanced search
- Filters (university, type, etc.)
- Sort options
```

---

## 💬 ÖZET: SENDEN İSTEDİKLERİM

**Tek bir response'da ver:**

1. ✅ Prisma schema (Document + University + Faculty + Department + Course)
2. ✅ Migration komutu
3. ✅ Seed script (208 üniversite verisi)
4. ✅ 5 API route (upload + lists)
5. ✅ Upload page (full featured)
6. ✅ 3 component (FileUpload, UniversitySelect, ProgressBar)
7. ✅ Utilities (fileUpload, thumbnail, validation)
8. ✅ npm install komutları
9. ✅ Test adımları

**Format:**
- Her dosya için: Dosya yolu + Tam kod + Açıklama
- Import'lar dahil
- Comment'lerle açıklama
- TypeScript strict mode

**Beklenti:**
- Kopyala-yapıştır hazır kod
- Çalışır durumda
- Production-ready (error handling dahil)

---

**Hazır mısın? Başlayalım! 🚀**

**Not:** Eğer tek response'a sığmayacak kadar uzunsa, önce şunları ver:
1. Schema + Migration + Seed
2. API Routes
3. Frontend Components

Böylece adım adım test edebiliriz.
