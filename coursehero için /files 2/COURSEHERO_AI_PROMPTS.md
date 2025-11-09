# 🤖 COURSEHERO PROJESİ - AI PROMPT'LARI
## Geliştirme Sürecinde Kullanılacak AI Yardımcı Komutları

---

## 📋 İÇİNDEKİLER

1. [Kod Geliştirme Prompt'ları](#1-kod-geliştirme-promptları)
2. [Veritabanı Tasarım Prompt'ları](#2-veritabanı-tasarım-promptları)
3. [UI/UX Tasarım Prompt'ları](#3-uiux-tasarım-promptları)
4. [Test Yazma Prompt'ları](#4-test-yazma-promptları)
5. [Dokümantasyon Prompt'ları](#5-dokümantasyon-promptları)
6. [Platform İçi AI Özellikleri Prompt'ları](#6-platform-i̇çi-ai-özellikleri-promptları)
7. [İçerik Üretim Prompt'ları](#7-i̇çerik-üretim-promptları)
8. [Debug ve Optimizasyon Prompt'ları](#8-debug-ve-optimizasyon-promptları)

---

## 1. KOD GELİŞTİRME PROMPT'LARI

### 1.1. Backend API Endpoint Oluşturma

```
Sen bir expert backend developer'sın. NestJS kullanarak şu API endpoint'i oluştur:

ENDPOINT: POST /api/documents/upload
AMAÇ: Kullanıcının not dosyasını yüklemesi

GEREKSİNİMLER:
1. Multipart form-data desteği
2. JWT authentication kontrolü
3. Dosya tip validasyonu (PDF, DOCX, PPTX - max 50MB)
4. S3'e upload
5. Database'e metadata kaydetme
6. Kullanıcıya puan kazandırma
7. Email notification gönderme
8. Comprehensive error handling
9. Rate limiting (kullanıcı başına günde 10 upload)
10. Swagger documentation

KULLANILACAK TEKNOLOJİLER:
- NestJS
- TypeORM
- AWS S3
- Bull Queue
- Class Validator

Lütfen:
- Tam çalışır kod yaz
- Her fonksiyonu detaylı açıkla
- Error handling ekle
- TypeScript type safety'yi koru
- SOLID prensiplerine uy
- Best practices kullan
```

### 1.2. React Component Oluşturma

```
Sen bir expert React developer'sın. Şu component'i oluştur:

COMPONENT: NoteDetailPage
AMAÇ: Not detay sayfasını gösterme

ÖZELLİKLER:
1. PDF preview (react-pdf)
2. Download butonu (kredi kontrolü ile)
3. Rating sistemi (1-5 yıldız)
4. Yorum yapma ve listeleme
5. Bookmark özelliği
6. Share butonları (WhatsApp, Twitter, LinkedIn)
7. Benzer notlar carousel
8. Author profil kartı
9. View/download istatistikleri
10. Responsive design (mobile-first)

TEKNOLOJILER:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- Zustand

GEREKSINIMLER:
- Server-side rendering
- Loading states
- Error boundaries
- Accessibility (WCAG AA)
- SEO optimize
- Performance optimize (lazy loading, code splitting)

Kod yazarken:
- Clean code principles
- Reusable sub-components
- Custom hooks kullan
- Comments ekle
```

### 1.3. Authentication Sistemi

```
NestJS kullanarak tam bir authentication sistemi oluştur:

ÖZELLİKLER:
1. Email/Password kayıt
2. JWT token yönetimi (access + refresh tokens)
3. Email verification
4. Password reset (forgot password)
5. Social login (Google, Facebook)
6. Two-factor authentication (2FA)
7. Session management
8. Role-based access control (RBAC)

GÜVENLIK:
- bcrypt ile password hashing
- Rate limiting (brute force koruması)
- CSRF protection
- XSS prevention
- SQL injection koruması
- Secure cookie management

Lütfen:
- Complete working code
- Database migrations
- DTOs ve validation
- Guards ve decorators
- Error messages (user-friendly)
- Security best practices
```

### 1.4. Arama Sistemi (Elasticsearch)

```
Elasticsearch kullanarak gelişmiş not arama sistemi kur:

ÖZELLIKLER:
1. Full-text search (Türkçe desteği)
2. Multi-field search (title, description, tags, content)
3. Faceted search (filters)
4. Autocomplete/suggestions
5. Fuzzy matching (typo tolerance)
6. Relevance scoring
7. Highlighting
8. Pagination
9. Sorting options
10. Search analytics

FILTERLER:
- Üniversite
- Fakülte/Bölüm
- Ders
- İçerik türü
- Dönem/Yıl
- Rating
- Tarih aralığı
- Sayfa sayısı

IMPLEMENTASYON:
- Node.js backend integration
- Index mapping design
- Search query building
- Performance optimization
- Cache strategy

Kod ve açıklama ver.
```

### 1.5. WebSocket Real-time Features

```
Socket.io kullanarak real-time özellikler ekle:

ÖZELLIKLER:
1. Instant notifications
2. Online user presence
3. Live comment updates
4. Real-time view counter
5. Typing indicators (yorumlar için)
6. Live study room chat
7. Collaborative note taking

BACKEND:
- Socket.io server setup
- Room management
- Authentication
- Event handling
- Redis adapter (scaling)

FRONTEND:
- Socket.io client
- React hooks integration
- Connection management
- Reconnection logic
- Optimistic UI updates

Tam implementasyon ver.
```

---

## 2. VERİTABANI TASARIM PROMPT'LARI

### 2.1. Database Schema Optimization

```
PostgreSQL database şemamı optimize et:

MEVCUT DURUM:
[users, documents, ratings, comments, downloads tabloları]

SORUNLAR:
1. Yavaş arama sorguları
2. Join performans problemleri
3. Artan veri boyutu

LÜTFEN:
1. Index stratejisi öner
2. Partitioning öner (hangi tablolar için)
3. Denormalization önerileri
4. Query optimization
5. Caching stratejisi
6. Archive stratejisi (eski veriler)
7. Materialized views önerileri

Migration script'leri de ekle.
```

### 2.2. Complex Query Yazma

```
Şu analitik sorguyu PostgreSQL'de yaz:

HEDEF:
"Bir kullanıcıya önerilecek notları bul"

KRİTERLER:
1. Kullanıcının bölümüne uygun
2. Henüz indirmediği notlar
3. Benzer kullanıcıların indirdiği
4. Yüksek puanlı (>4.0)
5. Son 1 yıl içinde yüklenmiş
6. Popüler (>100 indirme)

ALGORITMA:
- Collaborative filtering mantığı
- Weighted scoring
- Diversity (farklı derslerden)

Query'yi optimize et:
- Efficient joins
- Proper indexing
- Subquery vs CTE
- Performance explain plan
```

### 2.3. Migration Script Oluşturma

```
Aşağıdaki değişiklikler için TypeORM migration script'i yaz:

DEĞİŞİKLİKLER:
1. users tablosuna "verified_educator" boolean kolonu ekle
2. documents tablosuna "ai_generated_summary" text kolonu ekle
3. yeni "study_groups" tablosu oluştur
4. yeni "group_members" junction tablosu oluştur
5. documents tablosuna "file_hash" (duplicate detection için)

GEREKSINIMLER:
- Up ve down migrations
- Data migration (mevcut veriler için)
- Foreign key constraints
- Indexes
- Default values

Production-safe olmalı (rollback desteği).
```

---

## 3. UI/UX TASARIM PROMPT'LARI

### 3.1. Landing Page Design

```
CourseHero benzeri bir not paylaşım platformu için modern landing page tasarla:

BÖLÜMLER:
1. Hero Section
   - Catchy headline
   - Search bar
   - CTA buttons
   - Student illustration

2. Features Section
   - 6 core feature
   - Icons + descriptions

3. How It Works
   - 3-step process
   - Visual flowchart

4. Stats Section
   - User count
   - Notes count
   - Universities
   - Downloads

5. Testimonials
   - Student reviews
   - Photo carousel

6. Pricing Plans
   - 3 tiers comparison

7. CTA Section
8. Footer

TASARIM:
- Modern, minimalist
- Blue-based color scheme
- Friendly, approachable
- Mobile-first responsive
- Accessibility

Tailwind CSS kodunu ver.
```

### 3.2. Component Library Oluşturma

```
Reusable React component library oluştur:

COMPONENTS:
1. Button (6 variants)
2. Input (with validation states)
3. Card (multiple layouts)
4. Modal/Dialog
5. Dropdown/Select
6. Toast/Notification
7. Badge/Chip
8. Avatar
9. Tabs
10. Accordion

REQUIREMENTS:
- TypeScript
- Tailwind CSS
- Accessibility (ARIA)
- Keyboard navigation
- Dark mode support
- Storybook documentation
- Unit tests

Her component için:
- Props interface
- Usage examples
- Styling variants
```

### 3.3. Dashboard Design

```
Student dashboard UI/UX tasarla:

WIDGETS:
1. Welcome banner (personalized)
2. Quick stats (uploads, downloads, points)
3. Recent activity
4. Recommended notes
5. Upcoming exams (calendar)
6. Study streak
7. Leaderboard position
8. Quick actions

LAYOUT:
- Sidebar navigation
- Main content area
- Right sidebar (notifications)
- Responsive grid

FEATURES:
- Drag & drop widget positioning
- Customizable layout
- Dark mode
- Data visualization (charts)

React + Tailwind + Recharts kullan.
```

---

## 4. TEST YAZMA PROMPT'LARI

### 4.1. Unit Tests (Backend)

```
DocumentsService için comprehensive unit tests yaz:

TEST EDILECEKLER:
1. create() method
   - Successful upload
   - Invalid file type
   - File too large
   - Missing required fields
   - Duplicate file (hash check)
   - Insufficient credits
   - S3 upload failure

2. findAll() method
   - Filters working
   - Pagination
   - Sorting
   - Empty results

3. download() method
   - Credit deduction
   - Permission check
   - Download logging
   - Premium access

KULLAN:
- Jest
- Test doubles (mocks, stubs)
- Factory pattern (test data)
- Coverage >80%

Her test için:
- AAA pattern (Arrange, Act, Assert)
- Clear test names
- Edge cases
```

### 4.2. Integration Tests

```
API endpoint integration tests yaz:

ENDPOINTS:
- POST /auth/register
- POST /auth/login
- POST /documents/upload
- GET /documents
- GET /documents/:id
- POST /documents/:id/download
- POST /documents/:id/rate

TEST SENARYOLARI:
1. Happy path
2. Authentication errors
3. Validation errors
4. Business logic errors
5. Rate limiting
6. Concurrent requests

SETUP:
- Test database (Docker)
- Seed data
- Cleanup after tests
- Supertest
- Factory patterns

Coverage >70% hedefle.
```

### 4.3. E2E Tests (Frontend)

```
User flows için Playwright E2E tests yaz:

USER FLOWS:
1. Registration Flow
   - Form validation
   - Email verification
   - Profile completion

2. Upload Flow
   - File selection
   - Form filling
   - Success confirmation

3. Search & Download Flow
   - Search notes
   - Apply filters
   - View details
   - Download (credit check)

4. Social Features
   - Comment
   - Rate
   - Bookmark
   - Share

REQUIREMENTS:
- Playwright
- Page Object Model
- Multiple browsers
- Mobile viewport
- Screenshots on failure
- Video recording
```

---

## 5. DOKÜMANTASYON PROMPT'LARI

### 5.1. API Documentation

```
REST API için comprehensive Swagger/OpenAPI documentation oluştur:

ENDPOINTS:
[Tüm API endpoints listesi]

HER ENDPOINT İÇİN:
1. Description
2. Request parameters
3. Request body schema
4. Response schemas (success + errors)
5. Authentication requirements
6. Rate limits
7. Examples (curl, JavaScript, Python)
8. Possible error codes

FORMAT:
- OpenAPI 3.0
- Interactive (try it out)
- Code examples
- Clear categorization

Postman collection da ekle.
```

### 5.2. Developer Onboarding Guide

```
Yeni developer'lar için kapsamlı onboarding guide yaz:

İÇERİK:
1. Projeye Giriş
   - Architecture overview
   - Technology stack
   - Design decisions

2. Setup
   - Prerequisites
   - Local development
   - Environment variables
   - Database setup
   - Seed data

3. Code Structure
   - Folder organization
   - Naming conventions
   - Code style guide
   - Git workflow

4. Development Guide
   - Creating new feature
   - Writing tests
   - Running tests
   - Debugging
   - Common pitfalls

5. Deployment
   - CI/CD pipeline
   - Staging
   - Production

Beginner-friendly yaz.
```

### 5.3. User Manual

```
Platform kullanıcıları için Türkçe user manual oluştur:

BÖLÜMLER:
1. Başlangıç
   - Kayıt olma
   - Profil oluşturma
   - Platform tanıtımı

2. Not Yükleme
   - Adım adım rehber
   - Dosya formatları
   - Best practices
   - Moderasyon süreci

3. Not Arama ve İndirme
   - Arama ipuçları
   - Filtreleme
   - Kredi sistemi
   - İndirme limitleri

4. Sosyal Özellikler
   - Yorum yapma
   - Puanlama
   - Paylaşma
   - Gruplar

5. Premium Özellikler
6. SSS
7. Sorun Giderme

Screenshots ve GIF'ler ekle.
```

---

## 6. PLATFORM İÇİ AI ÖZELLİKLERİ PROMPT'LARI

### 6.1. Not Analizi ve Kalite Skoru

```
GÖREV: Yüklenen akademik notu analiz et ve kalite skoru ver

SİSTEM ROLÜ:
Sen bir akademik içerik analistsin. Üniversite öğrencilerinin yüklediği ders notlarını analiz edip kalite değerlendirmesi yapıyorsun.

ANALİZ KRİTERLERİ:
1. İçerik Kalitesi (30 puan)
   - Konular kapsamlı mı?
   - Açıklamalar net mi?
   - Örnekler var mı?

2. Yapı ve Organizasyon (25 puan)
   - Başlıklar ve alt başlıklar
   - Mantıksal akış
   - İçindekiler

3. Görsel Kalite (20 puan)
   - Okunabilirlik
   - Diyagram/şekil kalitesi
   - Düzen

4. Eksiksizlik (15 puan)
   - Ders müfredatını kapsama
   - Eksik konu var mı?

5. Ek Değer (10 puan)
   - Sınav soruları
   - Özet/cheat sheet
   - Pratik ipuçları

ÇIKTI FORMATI (JSON):
{
  "quality_score": 4.2,
  "difficulty_level": 3,
  "completeness": 85,
  "strengths": ["Kapsamlı içerik", "İyi örnekler"],
  "weaknesses": ["Az görsel", "Bazı konular yüzeysel"],
  "suggested_tags": ["anayasa", "temel-haklar", "hukuk"],
  "summary": "Anayasa Hukuku I dersi için kapsamlı notlar...",
  "estimated_study_hours": 15,
  "suitable_for": ["vize", "final"]
}

NOT METNİ:
[Buraya not içeriği gelecek]

Analiz et.
```

### 6.2. Akıllı Özet Oluşturma

```
GÖREV: Uzun ders notunu özetle

SİSTEM ROLÜ:
Sen bir özetleme uzmanısın. Akademik içerikleri öğrencilerin hızlı öğrenmesi için özetliyorsun.

ÖZET TÜRÜ: {short|medium|long}
HEDEF KİTLE: Üniversite öğrencisi
DİL: Türkçe

KURALLAR:
1. Ana kavramları koru
2. Önemli örnekleri dahil et
3. Madde işaretleri kullan
4. Anlaşılır dil (jargon açıkla)
5. Mantıksal sıralama

ÖZET UZUNLUKLARI:
- short: 200-300 kelime (5 dakikalık okuma)
- medium: 500-700 kelime (10 dakikalık okuma)
- long: 1000-1500 kelime (20 dakikalık okuma)

NOT İÇERİĞİ:
[Buraya tam not metni]

ÖZET TİPİ: medium

Özetle.
```

### 6.3. Kavram Açıklayıcı (ELI5)

```
GÖREV: Karmaşık akademik kavramı basit şekilde açıkla

SİSTEM ROLÜ:
Sen bir öğretim asistanısın. Karmaşık kavramları sade dille açıklıyorsun.

YÖNTEMLERİN:
1. ELI5 (Explain Like I'm 5) - Çok basit
2. Analoji kullan
3. Günlük hayattan örnekler
4. Adım adım açıklama
5. Görsel tanımlama (ne gibi görünür)

AÇIKLAMA SEVİYELERİ:
- lise: Lise öğrencisine açıklar gibi
- lisans: Üniversite 1. sınıf seviyesi
- ileri: Detaylı akademik açıklama

FORMAT:
1. Basit Açıklama (2-3 cümle)
2. Detaylı Açıklama (1 paragraf)
3. Günlük Hayat Örneği
4. Analoji
5. İlgili Kavramlar
6. Daha Fazla Öğrenme Kaynakları

KAVRAM: {kavram}
SEVİYE: lisans
KONU: {ders_adi}

Açıkla.
```

### 6.4. Test Soruları Oluşturma

```
GÖREV: Notlardan sınav soruları oluştur

SİSTEM ROLÜ:
Sen bir sınav hazırlama uzmanısın. Ders notlarından kaliteli sınav soruları üretiyorsun.

SORU TİPLERİ:
1. Çoktan Seçmeli (4 şık)
2. Doğru/Yanlış
3. Boşluk Doldurma
4. Kısa Cevaplı
5. Eşleştirme

ZORLUK SEVİYESİ:
- kolay: 40%
- orta: 40%
- zor: 20%

GEREKSİNİMLER:
- Bloom's Taxonomy'ye uygun
- Net ve anlaşılır sorular
- Çeldiriciler mantıklı (çoktan seçmeli için)
- Doğru cevap işaretli
- Açıklama (neden bu cevap doğru)
- Puan değeri

ÇIKTI FORMATI (JSON):
{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "Soru metni?",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "B",
      "explanation": "B şıkkı doğrudur çünkü...",
      "points": 10,
      "topic": "Anayasa Hukuku - Temel Haklar",
      "bloom_level": "understand"
    }
  ]
}

NOT İÇERİĞİ:
[Notlar]

SORU SAYISI: 20
SINAV TÜRÜ: vize

Soruları oluştur.
```

### 6.5. Kişiselleştirilmiş Çalışma Planı

```
GÖREV: Öğrenci için çalışma planı oluştur

SİSTEM ROLÜ:
Sen bir eğitim danışmanısın. Öğrencilerin akademik başarısı için kişiselleştirilmiş çalışma programları hazırlıyorsun.

ÖĞRENCİ BİLGİLERİ:
- Adı: {ad}
- Sınıf: {sinif}
- Bölüm: {bolum}
- Haftalık müsait saat: {saat}
- Çalışma tercihi: {sabah|öğlen|akşam|gece}
- Güçlü konular: {konular}
- Zayıf konular: {konular}

SINAV BİLGİLERİ:
{
  "sinav_tarihi": "2025-01-15",
  "dersler": [
    {"ad": "Anayasa Hukuku I", "kapsam": "1-7. haftalar", "zorluk": 4},
    {"ad": "Medeni Hukuk", "kapsam": "1-8. haftalar", "zorluk": 5}
  ]
}

PLAN ÖZELLİKLERİ:
1. Günlük çalışma saatleri
2. Ders bazlı zaman dağılımı
3. Tekrar günleri
4. Ara günler (burnout önleme)
5. Mock sınavlar
6. Konu önceliklendirme (zayıf konular ağırlıklı)
7. Pomodoro tekniği entegrasyonu
8. İlerleme milestone'ları

ÇIKTI: Günlük detaylı çalışma planı (JSON + Markdown)

Planı oluştur.
```

### 6.6. Benzer Not Önerisi (Recommendation)

```
GÖREV: Kullanıcıya benzer notları öner

SİSTEM ROLÜ:
Sen bir recommendation engine'sin. Collaborative filtering ve content-based filtering kullanarak önerilerde bulunuyorsun.

KULLANICI BAĞLAMI:
{
  "user_id": "123",
  "university": "Ankara Üniversitesi",
  "department": "Hukuk",
  "year": 2,
  "recently_viewed": ["doc1", "doc2", "doc3"],
  "recently_downloaded": ["doc4", "doc5"],
  "bookmarks": ["doc6"],
  "interests": ["anayasa", "ceza-hukuku"]
}

MEVCUT NOT:
{
  "id": "doc_xyz",
  "title": "Anayasa Hukuku I - Temel Haklar",
  "course": "Anayasa Hukuku I",
  "tags": ["anayasa", "temel-haklar", "özgürlükler"],
  "difficulty": 3
}

ÖNERİ STRATEJİLERİ:
1. Aynı dersten başka notlar
2. İlgili derslerden notlar (prerequisites, corequisites)
3. Benzer kullanıcıların indirdiği
4. Yüksek puanlı içerikler
5. Popüler içerikler
6. Kullanıcının zayıf konularına yönelik

ÇIKTI:
- 10 öneri
- Öneri sebebi (why this note?)
- Confidence score
- Çeşitlilik (farklı dersler)

JSON formatında öner.
```

### 6.7. Soru-Cevap Chatbot

```
GÖREV: Öğrenci sorularını cevapla

SİSTEM ROLÜ:
Sen bir AI öğretim asistanısın. Öğrencilerin ders ile ilgili sorularını cevaplıyorsun.

BAĞLAM (Not içeriği):
[İlgili ders notları]

KURALLAR:
1. Nezaket ve saygı
2. Açık ve anlaşılır cevaplar
3. Kaynak göster (hangi nottan)
4. Emin değilsen belirt
5. Takip soruları öner
6. Örneklerle destekle
7. Gerekirse adım adım açıkla
8. Türkçe karakterlere dikkat

CEVAP FORMATI:
1. Direkt cevap (1-2 cümle TL;DR)
2. Detaylı açıklama
3. Örnek
4. İlgili kavramlar
5. Daha fazla öğrenme için kaynaklar
6. Takip soruları

ÖĞRENCİ SORUSU:
"{soru}"

Cevapla.
```

---

## 7. İÇERİK ÜRETİM PROMPT'LARI

### 7.1. Blog Post Yazma

```
CourseHero benzeri platformumuz için SEO-friendly blog post yaz:

KONU: {konu}
HEDEF KELİME: {keyword}
UZUNLUK: 1500-2000 kelime
HEDEF KİTLE: Üniversite öğrencileri

YAPI:
1. Dikkat Çekici Başlık (SEO optimized)
2. Meta Description (155 karakter)
3. Giriş (hook + problem statement)
4. Ana İçerik
   - Alt başlıklar (H2, H3)
   - Bullet points
   - Örnekler
   - İstatistikler
   - Alıntılar
5. İnfografik önerisi
6. Sonuç (CTA ile)
7. İlgili içerikler

SEO:
- Keyword density: 1-2%
- LSI keywords kullan
- Internal links (5-7)
- External links (authoritative sources)
- Image alt texts
- Schema markup önerisi

TON: Friendly, informative, encouraging

ÖRNEKLER KONU:
- "Üniversitede Verimli Not Tutma Teknikleri"
- "Sınav Stresini Azaltmanın 10 Yolu"
- "Başarılı Öğrencilerin 7 Alışkanlığı"

Yaz.
```

### 7.2. Email Marketing Campaign

```
Email kampanyası oluştur:

KAMPANYA TÜRÜ: {welcome|reengagement|premium_upsell|seasonal}

TARGET SEGMENT:
- Yeni kayıtlılar (0-7 gün)
- Aktif kullanıcılar
- Inactive users (30+ gün)
- Free users (premium'a geçmesi için)

EMAIL SERİSİ: {kaç email}

HER EMAIL İÇİN:
1. Subject line (A/B test için 2 versiyon)
2. Preheader text
3. Email body (HTML + Plain text)
4. CTA buttons
5. Personalization tags
6. Images/GIFs
7. Footer

KURALLAR:
- Mobile-responsive
- CAN-SPAM compliant
- Unsubscribe link
- Kısa ve öz (max 200 kelime)
- Tek bir net CTA
- Aciliyet hissi (FOMO)
- Social proof

METRICS:
- Open rate hedefi: >25%
- Click rate hedefi: >5%
- Conversion hedefi: >2%

Kampanyayı tasarla.
```

### 7.3. Social Media Content Calendar

```
1 aylık sosyal medya content calendar oluştur:

PLATFORMLAR:
- Instagram (feed + stories + reels)
- Twitter/X
- TikTok
- LinkedIn

POST TÜRLERİ:
1. Educational (çalışma ipuçları)
2. Promotional (platform features)
3. User-generated content
4. Behind-the-scenes
5. Memes/funny
6. Motivational
7. Student success stories
8. Announcement
9. Q&A/polls
10. Trending topics

FREQUENCY:
- Instagram: Günde 1-2 post + 3-5 story
- Twitter: Günde 3-5 tweet
- TikTok: Haftada 3-5 video
- LinkedIn: Haftada 2-3 post

CONTENT MIX: 70% value, 20% engagement, 10% promotion

FORMAT (Excel/CSV):
Tarih | Platform | Post Type | Caption | Hashtags | Media | Link | Notes

Başlıklar, hashtag'ler, post ideas ver.
```

### 7.4. Video Script (Tutorial)

```
Platform özelliği için tutorial video script'i yaz:

VIDEO: "Nasıl Not Yüklenir? (Adım Adım Rehber)"
SÜRE: 2-3 dakika
FORMAT: Screen recording + voiceover

SCRIPT YAPISI:
1. Hook (0-5 sn)
   - Dikkat çekici soru/sorun
   
2. Giriş (5-15 sn)
   - Kim olduğumuz
   - Video'da neler öğrenecekler

3. Ana İçerik (90-150 sn)
   - Adım adım process
   - Screen'de yapılanlar
   - Pro tips
   - Common mistakes to avoid

4. Kapanış (10-15 sn)
   - Özet
   - CTA
   - Subscribe/like reminder

VOICEOVER:
- Konuşmacı dili (conversational)
- Türkçe
- Net ve yavaş telaffuz
- Pauses işaretle

B-ROLL:
- Ekstra görüntüler
- Graphics/animations
- Text overlays

SCRIPT + STORYBOARD ver.
```

---

## 8. DEBUG VE OPTİMİZASYON PROMPT'LARI

### 8.1. Performance Optimization

```
React app'imi optimize et:

MEVCUT SORUNLAR:
1. Yavaş initial load (5+ saniye)
2. Liste scroll'larken lag
3. Büyük bundle size (2MB+)
4. Gereksiz re-renders
5. Memory leaks

PROFILER DATA:
[Chrome DevTools Lighthouse raporu]

LÜTFEN:
1. Bundle analysis yap
2. Code splitting öner
3. Lazy loading stratejisi
4. Memoization fırsatları
5. Image optimization
6. Caching stratejisi
7. Tree shaking
8. Dead code elimination

OPTİMİZASYON HEDEFLERİ:
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <500KB
- Lighthouse score: >90

Öneri ve kod ver.
```

### 8.2. Bug Fixing

```
Şu bug'ı çöz:

BUG RAPORU:
- Başlık: {bug_başlığı}
- Açıklama: {detaylı_açıklama}
- Nasıl tekrarlanır:
  1. {adım1}
  2. {adım2}
  3. {adım3}
- Beklenen davranış: {beklenen}
- Gerçek davranış: {gerçek}
- Environment: {browser, OS, version}
- Error logs: {logs}
- Screenshots: {varsa}

İLGİLİ KOD:
```typescript
{ilgili_kod_bloğu}
```

DEBUG SÜRECI:
1. Root cause analysis
2. Reproducible test case
3. Fix implementation
4. Test yazma
5. Regression check

ÇÖZÜM:
- Neden oluştu?
- Düzeltilmiş kod
- Test case
- Benzer bug'ları önleme

Çöz ve açıkla.
```

### 8.3. Code Review

```
Şu kodu review et:

```typescript
{kod_bloğu}
```

REVIEW KRİTERLERİ:
1. Code Quality
   - Readability
   - Maintainability
   - SOLID principles
   - DRY principle

2. Performance
   - Time complexity
   - Space complexity
   - Unnecessary operations

3. Security
   - Vulnerabilities
   - Input validation
   - SQL injection risks
   - XSS risks

4. Best Practices
   - Naming conventions
   - Error handling
   - Logging
   - Comments

5. Testing
   - Testability
   - Edge cases

FEEDBACK FORMATI:
👍 What's Good:
- {iyi_yönler}

⚠️ Issues:
- {sorunlar} (severity: critical|high|medium|low)

💡 Suggestions:
- {öneri_1}
- {öneri_2}

📝 Refactored Code:
```typescript
{iyileştirilmiş_kod}
```

Review yap.
```

### 8.4. Database Query Optimization

```
Yavaş çalışan SQL query'yi optimize et:

QUERY:
```sql
{mevcut_query}
```

PERFORMANS:
- Execution time: {time}ms
- Rows examined: {rows}
- Index usage: {yes|no}

EXPLAIN PLAN:
{explain_output}

TABLO BÜYÜKLÜKLERİ:
- users: 1M rows
- documents: 500K rows
- downloads: 5M rows

LÜTFEN:
1. Query'yi analiz et
2. Bottleneck'leri belirle
3. Index önerileri
4. Query rewrite
5. Denormalization önerileri
6. Caching stratejisi
7. Partitioning önerisi

HEDEF: <100ms execution time

Optimize et.
```

### 8.5. Security Audit

```
Sistemin güvenlik audit'ini yap:

SCOPE:
- Authentication system
- File upload
- Payment processing
- API endpoints
- Database queries
- Frontend (XSS, CSRF)

KONTROL EDİLECEKLER:
1. OWASP Top 10
   - Injection
   - Broken Authentication
   - Sensitive Data Exposure
   - XML External Entities
   - Broken Access Control
   - Security Misconfiguration
   - XSS
   - Insecure Deserialization
   - Using Components with Known Vulnerabilities
   - Insufficient Logging & Monitoring

2. Authentication & Authorization
   - Password policies
   - Session management
   - JWT security
   - RBAC implementation

3. Data Protection
   - Encryption (at rest & in transit)
   - PII handling
   - GDPR/KVKK compliance

4. Input Validation
5. Error Handling
6. Logging & Monitoring

ÇIKTI:
- Vulnerability list (severity rated)
- Remediation recommendations
- Code examples
- Priority order

Audit yap ve rapor et.
```

---

## 9. ÖZEL DURUMLAR İÇİN PROMPT'LAR

### 9.1. Mobil Uygulama Özellikleri

```
React Native ile mobil app geliştir:

PLATFORM: iOS + Android

ÖZELLİKLER:
1. Offline mode
   - Downloaded notes accessible
   - Sync when online
   - Conflict resolution

2. Push Notifications
   - New comment on your note
   - Document approved
   - Credit earned
   - Study reminder

3. Biometric Authentication
   - Face ID / Touch ID
   - Fingerprint

4. QR Code
   - Share note via QR
   - Quick download

5. Camera Integration
   - Document scanning
   - OCR text extraction

6. Dark Mode

TEKNIK:
- React Native 0.72+
- React Navigation
- Redux Toolkit
- React Query
- AsyncStorage
- Push Notifications (FCM)
- react-native-camera

Code structure ve önemli components ver.
```

### 9.2. Analytics Implementation

```
Analytics sistemi kur:

TRACKLENECEKLER:
1. User Events
   - Sign up
   - Login
   - Upload note
   - Download note
   - Search
   - Filter usage
   - Page views
   - Button clicks
   - Form submissions

2. Engagement Metrics
   - Daily Active Users (DAU)
   - Monthly Active Users (MAU)
   - Session duration
   - Bounce rate
   - Retention rate

3. Business Metrics
   - Conversion rate (free → premium)
   - Revenue
   - Churn rate
   - LTV (Lifetime Value)

TOOLS:
- Google Analytics 4
- Mixpanel / Amplitude
- Custom dashboard (React + D3.js)

IMPLEMENTASYON:
- Frontend tracking
- Backend tracking
- Event schema design
- Privacy compliance (cookie consent)
- Real-time dashboard

Kod ve setup ver.
```

### 9.3. Internationalization (i18n)

```
Uygulamayı çoklu dil desteğine hazırla:

DESTEKLENECEK DİLLER:
1. Türkçe (varsayılan)
2. İngilizce
3. Almanca (gelecek)

ÇEVİRİLECEKLER:
- UI metinleri
- Error messages
- Email templates
- Notification texts
- SEO metadata

ARAÇLAR:
- react-i18next (frontend)
- i18next (backend)
- Translation management (Lokalise/Phrase)

BEST PRACTICES:
- Namespace organization
- Pluralization
- Date/time formatting
- Number formatting
- Currency
- RTL support (future)

IMPLEMENTASYON:
1. Setup konfigürasyonu
2. Translation files structure
3. Component usage examples
4. Dynamic content handling
5. Missing translation handling
6. Language switcher UI

Tam setup ver.
```

### 9.4. Admin Panel

```
Admin paneli tasarla ve kod yaz:

ÖZELLİKLER:
1. Dashboard
   - Key metrics
   - Charts (users, uploads, revenue)
   - Recent activity

2. User Management
   - List users
   - View/edit profiles
   - Ban/suspend users
   - Role assignment

3. Content Moderation
   - Pending uploads queue
   - Approve/reject
   - Flag management
   - Bulk actions

4. Analytics
   - Custom reports
   - Export data
   - Filters & date ranges

5. Settings
   - Platform configuration
   - Email templates
   - Payment settings
   - Feature flags

TEKNOLOJI:
- React + TypeScript
- React Admin / Refine
- Charts: Recharts
- Table: TanStack Table

UI mockup ve kod ver.
```

---

## 10. BONUS: PROJE YÖNETİMİ PROMPT'LARI

### 10.1. Sprint Planning

```
2 haftalık sprint planı oluştur:

BACKLOG:
{user_story_listesi}

TEAM:
- 2 Full-stack Developer
- 1 Frontend Developer
- 1 QA Engineer
- 1 Product Manager

SPRINT GOAL:
{hedef}

LÜTFEN:
1. User story'leri prioritize et
2. Task'lara böl
3. Story point ata (Fibonacci)
4. Team member'lara ata
5. Dependencies belirle
6. Risk assessment
7. Daily standup template
8. Sprint review criteria

ÇIKTI:
- Sprint board (To Do, In Progress, Review, Done)
- Gantt chart
- Capacity planning

Jira/Trello formatında ver.
```

### 10.2. Technical Debt Assessment

```
Technical debt'i değerlendir ve önceliklendirme planı oluştur:

CODE BASE:
{proje_istatistikleri}

SORUNLAR:
1. Outdated dependencies
2. No test coverage
3. Duplicate code
4. Poor documentation
5. Performance issues
6. Security vulnerabilities

DEĞERLENDİRME:
- Impact (High/Medium/Low)
- Effort (Hours estimate)
- Priority (Must/Should/Could/Won't)

REFACTORING PLANI:
- Phase 1 (Critical - 2 weeks)
- Phase 2 (High priority - 4 weeks)
- Phase 3 (Nice to have - 8 weeks)

Roadmap oluştur.
```

---

## 📌 PROMPT KULLANIM İPUÇLARI

### ✅ Etkili Prompt Yazma Prensipleri:

1. **Açık ve Spesifik Ol**
   - Belirsiz: "Kod yaz"
   - İyi: "NestJS kullanarak JWT authentication sistemi oluştur"

2. **Bağlam Ver**
   - Teknoloji stack'i belirt
   - Proje gereksinimlerini ekle
   - Kısıtlamaları söyle

3. **Format Belirle**
   - Çıktı formatını tanımla (JSON, Markdown, kod, etc.)
   - Örnek göster

4. **Adım Adım İste**
   - Karmaşık görevleri böl
   - Her adımı ayrı prompt'la

5. **Iterate Et**
   - İlk çıktı perfect olmayabilir
   - Follow-up prompt'larla iyileştir

### 🎯 Prompt Template:

```
ROL: {AI'nin rolü}
GÖREV: {Ne yapması gerekiyor}
BAĞLAM: {Proje/durum bilgisi}
GEREKSİNİMLER:
  - {gereksinim_1}
  - {gereksinim_2}
TEKNOLOJİLER: {kullanılacak_araçlar}
ÇIKTI FORMATI: {istenen_format}
KISITLAMALAR: {sınırlamalar}

{ek_talimatlar}

Lütfen {spesifik_istek}.
```

---

## ✨ SONUÇ

Bu prompt koleksiyonu ile:
- ✅ Kod geliştirme hızlanır
- ✅ Tutarlı kod kalitesi sağlanır
- ✅ Dokümantasyon otomatikleşir
- ✅ Test coverage artar
- ✅ AI özellikler kolayca entegre edilir
- ✅ İçerik üretimi hızlanır

**Kullanım:**
1. İhtiyacına uygun prompt'u seç
2. Placeholder'ları kendi verilerinle doldur
3. AI'ye (ChatGPT, Claude, etc.) gönder
4. Çıktıyı review et ve kullan
5. Gerekirse iterasyon yap

**Not:** Bu prompt'lar starter template'lerdir. Kendi ihtiyaçlarınıza göre özelleştirin!

---

**Hazırlayan:** AI Assistant  
**Tarih:** 22 Ekim 2025  
**Versiyon:** 1.0  
**Proje:** CourseHero Clone

**İyi Geliştirmeler!** 🚀👨‍💻
