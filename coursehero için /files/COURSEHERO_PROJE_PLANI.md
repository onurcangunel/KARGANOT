# 📚 COURSEHERO BENZERİ NOT PAYLAŞIM PLATFORMU
## Kapsamlı Proje Planı ve Teknik Dokümantasyon

---

## 📋 İÇİNDEKİLER

1. [Proje Özeti](#proje-özeti)
2. [Özellikler ve Fonksiyonlar](#özellikler-ve-fonksiyonlar)
3. [Teknik Mimari](#teknik-mimari)
4. [Veritabanı Şeması](#veritabanı-şeması)
5. [Kullanıcı Arayüzü (UI/UX)](#kullanıcı-arayüzü)
6. [İş Modeli](#iş-modeli)
7. [Geliştirme Aşamaları](#geliştirme-aşamaları)
8. [Güvenlik ve Uyumluluk](#güvenlik-ve-uyumluluk)
9. [Maliyet Analizi](#maliyet-analizi)
10. [Pazarlama Stratejisi](#pazarlama-stratejisi)

---

## 1. PROJE ÖZETİ

### 🎯 **Vizyon**
Türkiye'deki üniversite öğrencilerinin akademik başarısını artırmak için kapsamlı bir not paylaşım ve öğrenme platformu oluşturmak.

### 🚀 **Misyon**
- Öğrencilerin kaliteli ders notlarına, ödevlere ve sınav materyallerine kolay erişimini sağlamak
- Peer-to-peer öğrenme kültürünü teşvik etmek
- Akademik içerik üreticilerini ödüllendirmek
- Türk üniversite ekosisteminde bilgi paylaşımını demokratikleştirmek

### 📊 **Hedef Kitle**
- **Primer:** Üniversite öğrencileri (18-25 yaş)
- **Sekonder:** Mezunlar, KPSS/YKS hazırlananlar
- **Tersiyer:** Akademisyenler, öğretmenler

### 🎁 **Değer Önerisi**
- ✅ 8+ milyon üniversite öğrencisine ulaşma potansiyeli
- ✅ 208 üniversite, 1000+ bölüm kapsamı
- ✅ Kalite kontrollü içerik
- ✅ Yapay zeka destekli öğrenme asistanı
- ✅ Gamification ile motivasyon

---

## 2. ÖZELLİKLER VE FONKSİYONLAR

### 🔐 **2.1. Kullanıcı Yönetimi**

#### **Kayıt ve Giriş**
- Email ile kayıt
- Sosyal medya entegrasyonu (Google, Facebook, Apple)
- Üniversite mail adresi doğrulaması (.edu.tr)
- İki faktörlü kimlik doğrulama (2FA)
- Öğrenci kimlik kartı doğrulaması (opsiyonel)

#### **Profil Yönetimi**
```
Kullanıcı Profili:
├── Temel Bilgiler
│   ├── Ad Soyad
│   ├── Profil Fotoğrafı
│   ├── Biyografi
│   └── Sosyal Medya Linkleri
├── Akademik Bilgiler
│   ├── Üniversite
│   ├── Fakülte
│   ├── Bölüm
│   ├── Sınıf
│   └── GPA (Opsiyonel)
├── İstatistikler
│   ├── Yüklenen Not Sayısı
│   ├── Toplam İndirme
│   ├── Aldığı Beğeni
│   ├── Puan Durumu
│   └── Rozetler
└── Ayarlar
    ├── Gizlilik
    ├── Bildirimler
    ├── Abonelik
    └── Hesap Yönetimi
```

#### **Kullanıcı Seviyeleri**
1. **Free User (Ücretsiz)**
   - Günde 3 not indirme
   - Temel arama
   - Reklam gösterimi
   
2. **Premium User (Aylık)**
   - Sınırsız indirme
   - Reklamsız deneyim
   - Öncelikli destek
   - AI Study Assistant
   - Offline erişim
   
3. **Contributor (İçerik Üreticisi)**
   - Tüm Premium özellikler
   - Kazanç paylaşımı
   - Özel rozet
   - Analitik dashboard
   
4. **Moderator (Moderatör)**
   - İçerik onaylama yetkisi
   - Kullanıcı yönetimi
   - Rapor inceleme
   
5. **Admin (Yönetici)**
   - Tam sistem kontrolü

---

### 📝 **2.2. Not Paylaşım Sistemi**

#### **Not Yükleme**
```javascript
// Not Yükleme Form Yapısı
{
  "university": "Ankara Üniversitesi",
  "campus": "Beşevler Kampüsü",
  "faculty": "Hukuk Fakültesi",
  "department": "Hukuk",
  "course": {
    "name": "Anayasa Hukuku I",
    "code": "HUK101",
    "instructor": "Prof. Dr. Ahmet Yılmaz",
    "semester": "Güz 2024"
  },
  "document": {
    "type": "Ders Notu | Özet | Slayt | Ödev | Sınav | Kılavuz",
    "title": "Anayasa Hukuku I - Detaylı Ders Notları",
    "description": "Yarıyıl boyunca tuttuğum kapsamlı ders notları...",
    "pages": 45,
    "language": "Türkçe",
    "quality": "Taranmış | El Yazısı | Dijital",
    "file": "anayasa_hukuku_notlar.pdf",
    "preview_images": ["sayfa1.jpg", "sayfa2.jpg"],
    "tags": ["anayasa", "temel haklar", "hukuk devleti"]
  },
  "metadata": {
    "academic_year": "2024-2025",
    "exam_coverage": ["Vize", "Final"],
    "difficulty": 3, // 1-5 skala
    "completeness": 4, // 1-5 skala
    "original": true // Kendi notum mu?
  }
}
```

#### **Desteklenen Dosya Formatları**
- 📄 PDF (Öncelikli)
- 📝 DOCX, DOC
- 📊 PPTX, PPT
- 📷 JPG, PNG (Taranmış notlar)
- 🗒️ TXT, MD
- 📐 Excel (XLS, XLSX)

#### **Otomatik İşleme**
1. **OCR (Optical Character Recognition)**
   - El yazısı notları metne çevirme
   - Tarama kalitesi iyileştirme
   
2. **AI Analizi**
   - İçerik kalite skoru
   - Konu tespiti
   - Otomatik etiketleme
   - Benzer içerik tespiti
   
3. **Dosya Optimizasyonu**
   - PDF sıkıştırma
   - Görsel optimizasyonu
   - Hızlı önizleme oluşturma

---

### 🔍 **2.3. Arama ve Keşfet**

#### **Gelişmiş Arama Filtreleri**
```
Arama Kriterleri:
├── Üniversite
├── Fakülte/Bölüm
├── Ders Adı/Kodu
├── Hoca Adı
├── Dönem/Yıl
├── İçerik Türü
│   ├── Ders Notu
│   ├── Özet
│   ├── Slayt
│   ├── Ödev Çözümü
│   ├── Geçmiş Sınav
│   └── Çalışma Kılavuzu
├── Kalite Puanı (⭐)
├── İndirme Sayısı
├── Yüklenme Tarihi
├── Sayfa Sayısı
├── Dil
└── Ücretsiz/Premium
```

#### **Akıllı Öneri Sistemi**
```python
# AI-Powered Recommendations
def recommend_notes(user):
    recommendations = []
    
    # 1. Aynı bölümdeki popüler notlar
    same_dept = get_popular_in_department(user.department)
    
    # 2. Benzer kullanıcıların indirdikleri
    similar_users = find_similar_users(user)
    collab_filter = collaborative_filtering(similar_users)
    
    # 3. Kullanıcının geçmişine göre
    content_based = content_based_filtering(user.history)
    
    # 4. Trend olan içerikler
    trending = get_trending_notes(user.university)
    
    # Weighted combination
    recommendations = combine_recommendations([
        (same_dept, 0.3),
        (collab_filter, 0.3),
        (content_based, 0.2),
        (trending, 0.2)
    ])
    
    return recommendations
```

#### **Keşfet Sayfası Bölümleri**
- 🔥 **Trend Notlar:** Bu hafta en çok indirilenler
- ⭐ **En İyi Notlar:** Yüksek puanlı içerikler
- 🆕 **Yeni Eklenenler:** Son 24 saat
- 📚 **Senin İçin:** AI önerileri
- 🏆 **Popüler Yazarlar:** En çok katkıda bulunanlar
- 📖 **Ders Kılavuzları:** Kapsamlı çalışma setleri

---

### ⭐ **2.4. Sosyal Özellikler**

#### **Etkileşim**
- 👍 Beğeni (Like)
- 💾 Kaydet (Bookmark)
- 💬 Yorum
- 📊 Puan verme (1-5 yıldız)
- 📤 Paylaş (WhatsApp, Twitter, LinkedIn)
- 🚩 Rapor et

#### **Topluluk**
```
Topluluk Özellikleri:
├── Soru-Cevap Forumu
│   ├── Ders hakkında sorular
│   ├── Sınav ipuçları
│   └── Ödev yardımı
├── Çalışma Grupları
│   ├── Grup oluşturma
│   ├── Sohbet
│   ├── Dosya paylaşımı
│   └── Ortak çalışma planı
├── Mentörlük Sistemi
│   ├── Üst sınıf-alt sınıf eşleştirme
│   ├── Birebir danışmanlık
│   └── Kariyer tavsiyeleri
└── Etkinlikler
    ├── Online çalışma seansları
    ├── Sınav hazırlık kampları
    └── Webinarlar
```

#### **Gamification (Oyunlaştırma)**
```javascript
// Puan Sistemi
const POINTS = {
  upload_note: 10,
  note_downloaded: 2,
  note_liked: 1,
  quality_bonus: 5,
  daily_login: 1,
  answer_question: 5,
  helpful_answer: 10,
  complete_profile: 20,
  verify_email: 10,
  first_upload: 50
};

// Rozetler
const BADGES = {
  'Yeni Başlayan': { requirement: 'İlk not yükleme', points: 50 },
  'Katkı Sağlayıcı': { requirement: '10 not yükle', points: 100 },
  'Uzman': { requirement: '50 not yükle', points: 500 },
  'Efsane': { requirement: '100 not yükle', points: 1000 },
  'Popüler Yazar': { requirement: '1000 indirme', points: 300 },
  'Yardımsever': { requirement: '50 soru cevapla', points: 200 },
  'Mentor': { requirement: '100 öğrenciye yardım et', points: 500 }
};

// Liderlik Tablosu
const LEADERBOARDS = {
  weekly: 'Bu hafta en çok puan kazananlar',
  monthly: 'Bu ay en çok katkıda bulunanlar',
  alltime: 'Tüm zamanların en iyileri',
  university: 'Üniversite bazında sıralama',
  department: 'Bölüm bazında sıralama'
};
```

---

### 🤖 **2.5. AI Öğrenme Asistanı**

#### **AI Study Assistant Özellikleri**
```python
class AIStudyAssistant:
    """
    Premium kullanıcılar için AI destekli öğrenme asistanı
    """
    
    def summarize_document(self, document):
        """Uzun dokümanları özetle"""
        summary = ai_model.summarize(document.content)
        return {
            'short_summary': summary[:500],
            'key_points': extract_key_points(document),
            'main_topics': identify_topics(document)
        }
    
    def explain_concept(self, concept, level='undergraduate'):
        """Kavramları açıkla"""
        explanation = ai_model.explain(
            concept=concept,
            difficulty=level,
            language='tr'
        )
        return {
            'simple_explanation': explanation.simple,
            'detailed_explanation': explanation.detailed,
            'examples': explanation.examples,
            'related_concepts': explanation.related
        }
    
    def generate_quiz(self, document, num_questions=10):
        """Dokümandan test soruları oluştur"""
        questions = ai_model.generate_questions(
            content=document.content,
            count=num_questions,
            types=['multiple_choice', 'true_false', 'short_answer']
        )
        return questions
    
    def answer_question(self, question, context):
        """Öğrenci sorularını cevapla"""
        answer = ai_model.answer(
            question=question,
            context=context,
            cite_sources=True
        )
        return {
            'answer': answer.text,
            'confidence': answer.confidence,
            'sources': answer.sources
        }
    
    def study_plan(self, courses, exam_dates):
        """Kişiselleştirilmiş çalışma planı oluştur"""
        plan = ai_model.create_study_plan(
            courses=courses,
            exam_dates=exam_dates,
            study_hours_per_day=4,
            weak_topics=identify_weak_topics(user)
        )
        return plan
```

#### **AI Özellikleri**
- 📖 **Akıllı Özet:** Uzun notları özetle
- 💡 **Kavram Açıklama:** Anlamadığın konuları açıkla
- ✍️ **Test Oluşturma:** Notlardan otomatik soru üret
- 🎯 **Çalışma Planı:** Kişiselleştirilmiş program
- 🔍 **Not Analizi:** İçerik kalite değerlendirmesi
- 🗣️ **Chatbot:** 7/24 sorularını cevapla
- 🎓 **Flashcard:** Kelime kartları oluştur
- 📊 **İlerleme Takibi:** Öğrenme analitiği

---

### 💰 **2.6. Kredi Sistemi (Freemium Model)**

#### **Kredi Kullanımı**
```javascript
const CREDIT_SYSTEM = {
  // Kredi Kazanma
  earn: {
    signup: 10,
    email_verify: 5,
    upload_note: 5,
    daily_login: 1,
    invite_friend: 10,
    complete_profile: 5,
    watch_ad: 1,
    survey_complete: 3
  },
  
  // Kredi Harcama
  spend: {
    download_note: 1,
    premium_note: 3,
    unlock_solution: 2,
    ai_explain: 1,
    ai_summarize: 2,
    remove_ad_day: 5
  },
  
  // Kredi Paketleri (Satın Alma)
  packages: [
    { credits: 50, price: 29.99, bonus: 5 },
    { credits: 100, price: 49.99, bonus: 15 },
    { credits: 250, price: 99.99, bonus: 50 },
    { credits: 500, price: 179.99, bonus: 100 }
  ]
};
```

#### **Abonelik Planları**
```
╔════════════════════════════════════════════════════════╗
║                  ABONELİK PLANLARI                     ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  📦 BASIC (Ücretsiz)                                   ║
║  ├─ Günde 3 not indirme                               ║
║  ├─ Temel arama                                       ║
║  ├─ Reklam gösterimi                                  ║
║  └─ Topluluk erişimi                                  ║
║                                                        ║
║  ⭐ PLUS (₺49.99/ay)                                   ║
║  ├─ Günde 20 not indirme                              ║
║  ├─ Reklamsız deneyim                                 ║
║  ├─ Gelişmiş arama filtreleri                         ║
║  ├─ Offline erişim                                    ║
║  └─ Öncelikli destek                                  ║
║                                                        ║
║  💎 PREMIUM (₺89.99/ay)                                ║
║  ├─ Sınırsız indirme                                  ║
║  ├─ AI Study Assistant                                ║
║  ├─ Tüm premium notlar                                ║
║  ├─ Çalışma grupları                                  ║
║  ├─ Mentörlük programı                                ║
║  ├─ Özel rozet                                        ║
║  └─ VIP destek                                        ║
║                                                        ║
║  🎓 ÖĞRENCİ PREMIUM (₺59.99/ay)                        ║
║  ├─ Tüm Premium özellikler                            ║
║  ├─ %33 indirimli                                     ║
║  └─ Öğrenci belgesi gerekli                           ║
║                                                        ║
║  🏫 ÜNİVERSİTE LİSANSI (Kurumsal)                      ║
║  ├─ Tüm öğrencilere Premium                           ║
║  ├─ Akademisyen paneli                                ║
║  ├─ Özelleştirilebilir içerik                         ║
║  └─ Analitik raporlama                                ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 3. TEKNİK MİMARİ

### 🏗️ **3.1. Sistem Mimarisi**

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  React.js / Next.js 14                                       │
│  ├─ TypeScript                                               │
│  ├─ Tailwind CSS                                             │
│  ├─ Redux Toolkit (State Management)                         │
│  ├─ React Query (Data Fetching)                              │
│  ├─ Socket.io Client (Real-time)                             │
│  └─ PWA Support                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY / CDN                          │
├─────────────────────────────────────────────────────────────┤
│  Cloudflare / AWS CloudFront                                 │
│  ├─ DDoS Protection                                          │
│  ├─ Rate Limiting                                            │
│  ├─ SSL/TLS                                                  │
│  └─ Caching                                                  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Server)                            │
├─────────────────────────────────────────────────────────────┤
│  Node.js + Express.js / NestJS                               │
│  ├─ REST API                                                 │
│  ├─ GraphQL API                                              │
│  ├─ WebSocket Server                                         │
│  ├─ Authentication (JWT + OAuth)                             │
│  ├─ File Processing Service                                  │
│  └─ Background Jobs (Bull Queue)                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   MICROSERVICES                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Auth       │  │   Upload     │  │   Search     │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Payment    │  │   Notification│  │   Analytics  │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   AI         │  │   Email      │                        │
│  │   Service    │  │   Service    │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATABASES                                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  PostgreSQL         │  │  MongoDB            │          │
│  │  (Primary DB)       │  │  (Documents/Logs)   │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  Redis              │  │  Elasticsearch      │          │
│  │  (Cache/Sessions)   │  │  (Full-text Search) │          │
│  └─────────────────────┘  └─────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  STORAGE & AI                                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  AWS S3 / MinIO     │  │  OpenAI API         │          │
│  │  (File Storage)     │  │  (AI Assistant)     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  Tesseract OCR      │  │  Python ML Services │          │
│  │  (Text Extraction)  │  │  (Recommendations)  │          │
│  └─────────────────────┘  └─────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### 📱 **3.2. Teknoloji Stack**

#### **Frontend**
```json
{
  "framework": "Next.js 14 (React 18)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + Shadcn UI",
  "state_management": "Redux Toolkit + Zustand",
  "data_fetching": "React Query (TanStack Query)",
  "forms": "React Hook Form + Zod",
  "routing": "Next.js App Router",
  "authentication": "NextAuth.js",
  "charts": "Recharts / Chart.js",
  "pdf_viewer": "React-PDF",
  "real_time": "Socket.io Client",
  "testing": "Jest + React Testing Library",
  "deployment": "Vercel"
}
```

#### **Backend**
```json
{
  "runtime": "Node.js 20 LTS",
  "framework": "NestJS (Express)",
  "language": "TypeScript",
  "api": "REST + GraphQL",
  "authentication": "Passport.js + JWT",
  "validation": "Class Validator",
  "orm": "Prisma / TypeORM",
  "queue": "Bull (Redis-based)",
  "websocket": "Socket.io",
  "cron": "node-cron",
  "testing": "Jest + Supertest",
  "documentation": "Swagger / OpenAPI",
  "deployment": "AWS EC2 / DigitalOcean"
}
```

#### **Database**
```json
{
  "primary_db": {
    "name": "PostgreSQL 15",
    "use": "User data, transactions, metadata",
    "orm": "Prisma"
  },
  "document_db": {
    "name": "MongoDB",
    "use": "Logs, analytics, flexible documents"
  },
  "cache": {
    "name": "Redis 7",
    "use": "Sessions, cache, rate limiting, queues"
  },
  "search": {
    "name": "Elasticsearch 8",
    "use": "Full-text search, autocomplete"
  }
}
```

#### **DevOps & Infrastructure**
```json
{
  "hosting": "AWS / DigitalOcean",
  "cdn": "Cloudflare",
  "storage": "AWS S3 / MinIO",
  "container": "Docker",
  "orchestration": "Kubernetes (optional) / Docker Compose",
  "ci_cd": "GitHub Actions / GitLab CI",
  "monitoring": "Prometheus + Grafana",
  "logging": "ELK Stack (Elasticsearch, Logstash, Kibana)",
  "error_tracking": "Sentry",
  "uptime_monitoring": "UptimeRobot"
}
```

#### **AI & ML**
```json
{
  "llm": "OpenAI GPT-4 / Claude",
  "embedding": "OpenAI Embeddings",
  "vector_db": "Pinecone / Qdrant",
  "ocr": "Tesseract.js / Google Vision API",
  "image_processing": "Sharp / ImageMagick",
  "ml_framework": "TensorFlow.js / PyTorch (Python service)"
}
```

---

## 4. VERİTABANI ŞEMASI

### 📊 **4.1. PostgreSQL Schema**

```sql
-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    username VARCHAR(50) UNIQUE,
    full_name VARCHAR(255),
    profile_image TEXT,
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user', -- user, premium, contributor, moderator, admin
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, banned
    
    -- Academic Info
    university_id INT REFERENCES universities(id),
    faculty_id INT REFERENCES faculties(id),
    department_id INT REFERENCES departments(id),
    student_id VARCHAR(50),
    grade_level INT,
    gpa DECIMAL(3,2),
    
    -- Gamification
    points INT DEFAULT 0,
    level INT DEFAULT 1,
    badges JSONB DEFAULT '[]',
    
    -- Subscription
    subscription_type VARCHAR(20) DEFAULT 'free', -- free, plus, premium
    subscription_start DATE,
    subscription_end DATE,
    credits INT DEFAULT 10,
    
    -- Social
    follower_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    
    -- Settings
    email_verified BOOLEAN DEFAULT FALSE,
    student_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    notification_settings JSONB,
    privacy_settings JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    
    -- Indexes
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_university (university_id),
    INDEX idx_role (role),
    INDEX idx_points (points DESC)
);

-- ============================================
-- UNIVERSITIES TABLE
-- ============================================
CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(20), -- devlet, vakif
    city VARCHAR(100),
    founded_year INT,
    logo TEXT,
    website VARCHAR(255),
    description TEXT,
    student_count INT,
    ranking INT,
    
    -- Stats
    total_notes INT DEFAULT 0,
    total_downloads INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_city (city),
    INDEX idx_ranking (ranking)
);

-- ============================================
-- FACULTIES TABLE
-- ============================================
CREATE TABLE faculties (
    id SERIAL PRIMARY KEY,
    university_id INT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- fakulte, enstitu, myo
    description TEXT,
    dean_name VARCHAR(255),
    
    -- Stats
    total_notes INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(university_id, slug),
    INDEX idx_university (university_id),
    INDEX idx_type (type)
);

-- ============================================
-- DEPARTMENTS TABLE
-- ============================================
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    degree_type VARCHAR(50), -- lisans, on_lisans, yuksek_lisans, doktora
    duration_years INT,
    language VARCHAR(50),
    quota INT,
    description TEXT,
    
    -- Stats
    total_notes INT DEFAULT 0,
    total_students INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(faculty_id, slug),
    INDEX idx_faculty (faculty_id),
    INDEX idx_degree (degree_type)
);

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255),
    semester INT, -- 1-8
    credit INT,
    ects INT,
    theoretical_hours INT,
    practical_hours INT,
    description TEXT,
    prerequisites TEXT[],
    
    -- Stats
    total_notes INT DEFAULT 0,
    avg_difficulty DECIMAL(2,1),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_department (department_id),
    INDEX idx_code (code),
    INDEX idx_slug (slug)
);

-- ============================================
-- DOCUMENTS (NOTES) TABLE
-- ============================================
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Academic Reference
    university_id INT NOT NULL REFERENCES universities(id),
    faculty_id INT REFERENCES faculties(id),
    department_id INT REFERENCES departments(id),
    course_id INT REFERENCES courses(id),
    
    -- Document Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    type VARCHAR(50), -- ders_notu, ozet, slayt, odev, sinav, kilavuz
    language VARCHAR(20) DEFAULT 'tr',
    
    -- File Info
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_size BIGINT, -- bytes
    file_type VARCHAR(50), -- pdf, docx, pptx, etc.
    page_count INT,
    preview_images TEXT[], -- thumbnail URLs
    
    -- Metadata
    academic_year VARCHAR(20), -- 2024-2025
    semester_type VARCHAR(20), -- guz, bahar, yaz
    exam_type VARCHAR(50)[], -- vize, final, butunleme
    tags TEXT[],
    
    -- Quality
    quality_score DECIMAL(3,2), -- AI-calculated 0-5
    difficulty_level INT, -- 1-5
    completeness INT, -- 1-5
    is_original BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Moderation
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, flagged
    moderation_notes TEXT,
    moderated_by UUID REFERENCES users(id),
    moderated_at TIMESTAMP,
    
    -- Engagement
    view_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    bookmark_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    rating_avg DECIMAL(2,1) DEFAULT 0,
    rating_count INT DEFAULT 0,
    
    -- Access
    is_premium BOOLEAN DEFAULT FALSE,
    credit_cost INT DEFAULT 1,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    
    -- Indexes
    INDEX idx_user (user_id),
    INDEX idx_university (university_id),
    INDEX idx_course (course_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_downloads (download_count DESC),
    INDEX idx_rating (rating_avg DESC),
    INDEX idx_created (created_at DESC),
    FULLTEXT INDEX idx_search (title, description, tags)
);

-- ============================================
-- RATINGS TABLE
-- ============================================
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    helpful_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(document_id, user_id),
    INDEX idx_document (document_id),
    INDEX idx_user (user_id),
    INDEX idx_rating (rating)
);

-- ============================================
-- COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id INT REFERENCES comments(id) ON DELETE CASCADE, -- for replies
    
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    like_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_document (document_id),
    INDEX idx_user (user_id),
    INDEX idx_parent (parent_id)
);

-- ============================================
-- DOWNLOADS TABLE (Activity Log)
-- ============================================
CREATE TABLE downloads (
    id SERIAL PRIMARY KEY,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    ip_address INET,
    user_agent TEXT,
    credits_spent INT DEFAULT 1,
    
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_document (document_id),
    INDEX idx_user (user_id),
    INDEX idx_date (downloaded_at)
);

-- ============================================
-- BOOKMARKS TABLE
-- ============================================
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    folder_name VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, document_id),
    INDEX idx_user (user_id),
    INDEX idx_document (document_id)
);

-- ============================================
-- TRANSACTIONS TABLE (Payment History)
-- ============================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    type VARCHAR(50), -- subscription, credits, donation
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'TRY',
    
    -- Payment Details
    payment_method VARCHAR(50), -- credit_card, paypal, bank_transfer
    payment_provider VARCHAR(50), -- iyzico, stripe
    provider_transaction_id VARCHAR(255),
    
    status VARCHAR(20), -- pending, completed, failed, refunded
    
    -- Related Info
    subscription_type VARCHAR(20),
    subscription_months INT,
    credits_purchased INT,
    
    invoice_url TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_date (created_at DESC)
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    type VARCHAR(50), -- like, comment, download, follow, system
    title VARCHAR(255),
    message TEXT,
    link TEXT,
    icon TEXT,
    
    is_read BOOLEAN DEFAULT FALSE,
    
    related_user_id UUID REFERENCES users(id),
    related_document_id UUID REFERENCES documents(id),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at DESC)
);

-- ============================================
-- STUDY_GROUPS TABLE
-- ============================================
CREATE TABLE study_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    course_id INT REFERENCES courses(id),
    creator_id UUID NOT NULL REFERENCES users(id),
    
    privacy VARCHAR(20) DEFAULT 'public', -- public, private, invite_only
    max_members INT DEFAULT 50,
    member_count INT DEFAULT 1,
    
    avatar TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_course (course_id),
    INDEX idx_creator (creator_id)
);

-- ============================================
-- GROUP_MEMBERS TABLE
-- ============================================
CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    role VARCHAR(20) DEFAULT 'member', -- admin, moderator, member
    
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(group_id, user_id),
    INDEX idx_group (group_id),
    INDEX idx_user (user_id)
);

-- ============================================
-- ANALYTICS TABLE (Daily Stats)
-- ============================================
CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    
    -- User Metrics
    new_users INT DEFAULT 0,
    active_users INT DEFAULT 0,
    
    -- Content Metrics
    new_documents INT DEFAULT 0,
    total_downloads INT DEFAULT 0,
    total_views INT DEFAULT 0,
    
    -- Engagement
    total_comments INT DEFAULT 0,
    total_ratings INT DEFAULT 0,
    total_bookmarks INT DEFAULT 0,
    
    -- Revenue
    revenue DECIMAL(10,2) DEFAULT 0,
    new_subscriptions INT DEFAULT 0,
    
    UNIQUE(date),
    INDEX idx_date (date DESC)
);
```

### 🔗 **4.2. ER Diagram**

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   USERS      │──────>│  UNIVERSITIES│──────>│  FACULTIES   │
└──────────────┘       └──────────────┘       └──────────────┘
       │                                               │
       │                                               ↓
       │                                       ┌──────────────┐
       │                                       │ DEPARTMENTS  │
       │                                       └──────────────┘
       │                                               │
       │                                               ↓
       │                                       ┌──────────────┐
       │                                       │   COURSES    │
       │                                       └──────────────┘
       │                                               │
       ↓                                               ↓
┌──────────────┐                               ┌──────────────┐
│  DOCUMENTS   │<──────────────────────────────│              │
└──────────────┘                               └──────────────┘
       │
       ├──────> RATINGS
       ├──────> COMMENTS
       ├──────> DOWNLOADS
       └──────> BOOKMARKS
```

---

## 5. KULLANICI ARAYÜZÜ (UI/UX)

### 🎨 **5.1. Tasarım Sistemi**

#### **Renk Paleti**
```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-500: #3b82f6; /* Ana mavi */
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  
  /* Secondary Colors */
  --secondary-500: #8b5cf6; /* Mor */
  --accent-500: #f59e0b; /* Turuncu */
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

#### **Typography**
```css
/* Font Families */
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Poppins', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

#### **Component Library**
- ✅ Button (Primary, Secondary, Outline, Ghost)
- ✅ Input (Text, Email, Password, Search)
- ✅ Select / Dropdown
- ✅ Modal / Dialog
- ✅ Toast / Notification
- ✅ Card
- ✅ Badge / Chip
- ✅ Avatar
- ✅ Tabs
- ✅ Accordion
- ✅ Progress Bar
- ✅ Skeleton Loader
- ✅ Pagination

### 📱 **5.2. Sayfa Yapıları**

#### **Ana Sayfa (Homepage)**
```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Keşfet  Notlarım  Topluluk  Premium  [Profil] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│           🎓 ÖĞRENCİLER İÇİN NOT PAYLAŞIM              │
│              8 Milyon Öğrenci | 208 Üniversite          │
│                                                          │
│     [🔍 Üniversite, Ders veya Hoca Ara...]             │
│                                                          │
│   ┌─────────────────────────────────────────────────┐ │
│   │         Popüler Kategoriler                      │ │
│   │  [Mühendislik] [Hukuk] [Tıp] [İşletme] [Eğitim]│ │
│   └─────────────────────────────────────────────────┘ │
│                                                          │
│   🔥 TREND NOTLAR                                       │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│   │ Not1 │  │ Not2 │  │ Not3 │  │ Not4 │            │
│   │ ⭐4.8│  │ ⭐4.9│  │ ⭐4.7│  │ ⭐4.6│            │
│   └──────┘  └──────┘  └──────┘  └──────┘            │
│                                                          │
│   ⭐ EN İYİ NOTLAR                                      │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│   │ Not5 │  │ Not6 │  │ Not7 │  │ Not8 │            │
│   └──────┘  └──────┘  └──────┘  └──────┘            │
│                                                          │
│   📚 SENİN İÇİN ÖNERİLER (AI)                          │
│   [Kişiselleştirilmiş not önerileri...]                │
│                                                          │
│   ────────────────────────────────────────              │
│                                                          │
│   📊 İSTATİSTİKLER                                      │
│   10M+ Not | 8M+ Öğrenci | 208 Üniversite              │
│                                                          │
│   🏆 POPÜLER YAZARLAR                                   │
│   [Top Contributors...]                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
│  [Footer: Hakkımızda | İletişim | Kullanım Koşulları] │
└─────────────────────────────────────────────────────────┘
```

#### **Not Detay Sayfası**
```
┌─────────────────────────────────────────────────────────┐
│  Header Navigation                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ← Geri   Anayasa Hukuku I - Detaylı Ders Notları      │
│                                                          │
│  ┌────────────────┐  ┌──────────────────────────────┐ │
│  │                │  │  📚 Anayasa Hukuku I          │ │
│  │   PDF          │  │  Ankara Üniversitesi          │ │
│  │   Önizleme     │  │  Hukuk Fakültesi              │ │
│  │                │  │                                │ │
│  │   [Sayfa 1]    │  │  👤 Ahmet Yılmaz              │ │
│  │                │  │  ⭐ 4.8/5 (124 değerlendirme) │ │
│  │                │  │  📥 1,253 indirme             │ │
│  └────────────────┘  │  📄 45 sayfa | 🇹🇷 Türkçe    │ │
│                      │                                │ │
│  [◀] 1/45 [▶]       │  💎 2 Kredi | Premium          │ │
│                      │                                │ │
│                      │  [📥 İndir] [💾 Kaydet]       │ │
│                      │                                │ │
│                      └──────────────────────────────┘ │
│                                                          │
│  ─────────────────────────────────────────              │
│                                                          │
│  📝 AÇIKLAMA                                            │
│  Anayasa Hukuku I dersinin tüm dönem boyunca...        │
│                                                          │
│  🏷️ ETİKETLER                                          │
│  #anayasa #temel-haklar #hukuk-devleti #insan-haklari  │
│                                                          │
│  📊 BİLGİLER                                            │
│  Dönem: Güz 2024 | Sınav: Vize + Final                 │
│  Hoca: Prof. Dr. Mehmet Demir                           │
│                                                          │
│  ─────────────────────────────────────────              │
│                                                          │
│  💬 YORUMLAR (24)                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 👤 Ali Veli          ⭐⭐⭐⭐⭐              │ │
│  │ "Çok detaylı ve anlaşılır notlar. Sınavda..."    │ │
│  │ 👍 12  💬 2  🕐 2 gün önce                      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                          │
│  ─────────────────────────────────────────              │
│                                                          │
│  📚 BENZERİ NOTLAR                                      │
│  [Önerilen notlar carousel...]                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### **Not Yükleme Sayfası**
```
┌─────────────────────────────────────────────────────────┐
│  📤 YENİ NOT YÜKLE                                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Adım 1/3: Dosya Seç                                    │
│  ●──────○────○                                          │
│                                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │     📁 Dosya Sürükle veya Tıkla                 │   │
│  │                                                  │   │
│  │     PDF, DOCX, PPTX, JPG (Max 50MB)            │   │
│  │                                                  │   │
│  └────────────────────────────────────────────────┘   │
│                                                          │
│  ────────────────────────────────────────                │
│                                                          │
│  Adım 2/3: Akademik Bilgiler                            │
│  ●──────●────○                                          │
│                                                          │
│  🏫 Üniversite:  [Dropdown ▼]                          │
│  🏛️ Fakülte:     [Dropdown ▼]                          │
│  📚 Bölüm:       [Dropdown ▼]                          │
│  📖 Ders:        [Autocomplete...]                      │
│  👨‍🏫 Hoca:        [İsteğe bağlı...]                     │
│  📅 Dönem:       [Güz 2024 ▼]                          │
│                                                          │
│  ────────────────────────────────────────                │
│                                                          │
│  Adım 3/3: Detaylar                                     │
│  ●──────●────●                                          │
│                                                          │
│  📝 Başlık:                                             │
│  [Anayasa Hukuku I - Detaylı Ders Notları]             │
│                                                          │
│  📋 Açıklama:                                           │
│  [Textarea - Notunuzu tanımlayın...]                   │
│                                                          │
│  🏷️ Etiketler:                                          │
│  [#anayasa] [#temel-haklar] [+ Ekle]                   │
│                                                          │
│  📑 İçerik Türü:                                        │
│  ☑ Ders Notu  ☐ Özet  ☐ Slayt  ☐ Ödev  ☐ Sınav        │
│                                                          │
│  ⚙️ Gelişmiş Ayarlar                                    │
│  Zorluk: ●●●○○                                          │
│  Kapsam: ●●●●○                                          │
│  □ Bu not bana aittir (orijinal)                       │
│  □ Premium olarak işaretle (2x kredi)                  │
│                                                          │
│                      [İptal] [📤 Yükle]                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### **Profil Sayfası**
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│      ┌────┐                                             │
│      │ 👤 │  Ahmet Yılmaz                               │
│      └────┘  @ahmet_yilmaz                              │
│              Ankara Üniversitesi - Hukuk                │
│              🏆 Level 12 | 2,450 Puan                   │
│              📚 45 Not | 📥 1.2K İndirme               │
│                                                          │
│              [Takip Et] [Mesaj Gönder]                  │
│                                                          │
│  ┌─────────┬─────────┬─────────┬─────────┐            │
│  │ Notlar  │ Kaydedilen │ Gruplar │ Rozetler │         │
│  └─────────┴─────────┴─────────┴─────────┘            │
│                                                          │
│  📚 YÜKLENEN NOTLAR (45)                                │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 📄 Anayasa Hukuku I                               │ │
│  │ ⭐ 4.8 | 📥 253                                  │ │
│  │ 2 gün önce                                        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 📄 Medeni Hukuk Genel                            │ │
│  │ ⭐ 4.9 | 📥 412                                  │ │
│  │ 1 hafta önce                                      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                          │
│  [Daha Fazla Göster...]                                 │
│                                                          │
│  ─────────────────────────────────────────              │
│                                                          │
│  🏆 ROZETLER                                            │
│  🥇 Yeni Başlayan  🥈 Katkı Sağlayıcı  🥉 Popüler     │
│                                                          │
│  📊 İSTATİSTİKLER                                       │
│  Total Views: 15.2K | Total Likes: 1.8K                │
│  Avg Rating: 4.7/5 | Response Rate: 95%                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 📱 **5.3. Mobil Uygulama**

#### **Özellikler**
- React Native / Flutter
- Offline mod (indirilen notları çevrimdışı okuma)
- Push notifications
- Biyometrik giriş (Touch ID, Face ID)
- QR kod ile hızlı paylaşım
- Dark mode
- Tablet desteği

---

## 6. İŞ MODELİ

### 💰 **6.1. Gelir Kaynakları**

#### **1. Abonelik Planları (Ana Gelir - %60)**
```
Aylık Gelir Projeksiyonu:
├─ Free Users: 100,000 kişi → ₺0
├─ Plus Users: 10,000 kişi × ₺49.99 → ₺499,900
├─ Premium Users: 5,000 kişi × ₺89.99 → ₺449,950
├─ Student Premium: 15,000 kişi × ₺59.99 → ₺899,850
└─ University License: 10 üniversite × ₺50,000 → ₺500,000
─────────────────────────────────────────────────────────
TOPLAM AYLIK GELİR: ~₺2,349,700 (~$87,000)
```

#### **2. Kredi Satışları (%15)**
- Tek seferlik kredi paketleri
- Özel dönemlerde indirimli kampanyalar

#### **3. Reklam Gelirleri (%10)**
- Free kullanıcılara banner reklamlar
- Sponsorlu içerik
- Native advertising
- Üniversite/eğitim kurumları reklamları

#### **4. İçerik Üreticisi Ödemesi (%10)**
- Premium notlardan %30 komisyon
- Popüler içerik üreticilerine bonus ödemeler
- Affiliate program

#### **5. Kurumsal Satışlar (%5)**
- Üniversite lisansları
- Özel entegrasyonlar
- White-label çözümler
- API erişimi

### 📈 **6.2. Büyüme Stratejisi**

#### **Yıl 1 (0-12 Ay): Temel Oluşturma**
```
Hedefler:
├─ 100,000 kayıtlı kullanıcı
├─ 50,000 aktif not
├─ 20 üniversite kapsamı
├─ 1,000 premium üye
└─ ₺500,000 aylık gelir

Stratejiler:
├─ Kampüs elçileri programı
├─ Referral sistemi (10 kredi bonus)
├─ Influencer işbirlikleri
└─ Sosyal medya pazarlama
```

#### **Yıl 2 (13-24 Ay): Hızlı Büyüme**
```
Hedefler:
├─ 500,000 kayıtlı kullanıcı
├─ 200,000 aktif not
├─ 100 üniversite kapsamı
├─ 10,000 premium üye
└─ ₺2,000,000 aylık gelir

Stratejiler:
├─ Mobil uygulama lansmanı
├─ AI özelliklerinin genişletilmesi
├─ Üniversite ortaklıkları
└─ B2B satış ekibi kurulumu
```

#### **Yıl 3 (25-36 Ay): Pazar Lideri**
```
Hedefler:
├─ 2,000,000 kayıtlı kullanıcı
├─ 1,000,000 aktif not
├─ 208 üniversite (tüm Türkiye)
├─ 50,000 premium üye
└─ ₺10,000,000 aylık gelir

Stratejiler:
├─ Uluslararası genişleme (KKTC, Balkanlar)
├─ AI asistan tam entegrasyon
├─ Marketplace oluşturma
└─ Yatırımcı görüşmeleri (Series A)
```

---

## 7. GELİŞTİRME AŞAMALARI

### 🚀 **7.1. MVP (Minimum Viable Product) - 3 Ay**

#### **Ay 1: Temel Altyapı**
```
Week 1-2: Proje Kurulumu
├─ Git repository oluşturma
├─ Development environment setup
├─ Database schema tasarımı
├─ CI/CD pipeline kurulumu
└─ Team collaboration tools

Week 3-4: Backend Temel
├─ Authentication sistemi
│   ├─ Email/Password kayıt
│   ├─ JWT implementation
│   └─ Email verification
├─ User management API
├─ File upload servisi
└─ Basic error handling
```

#### **Ay 2: Core Features**
```
Week 5-6: Not Sistemi
├─ Not yükleme API
├─ Not listeleme/filtreleme
├─ Not detay sayfası
├─ PDF viewer entegrasyonu
└─ Basit arama

Week 7-8: Frontend Temel
├─ Homepage
├─ Login/Register sayfaları
├─ Not yükleme formu
├─ Not listeleme
└─ Responsive design
```

#### **Ay 3: Test ve Lansman**
```
Week 9-10: Ek Özellikler
├─ Rating/Review sistemi
├─ Bookmark functionality
├─ User profil sayfası
├─ Basic dashboard
└─ Notification sistemi

Week 11-12: Test & Deploy
├─ Unit tests
├─ Integration tests
├─ Beta testing (50-100 kullanıcı)
├─ Bug fixes
└─ Production deployment
```

### 📦 **7.2. Version 1.0 - 3 Ay**

#### **Ay 4-6: Gelişmiş Özellikler**
```
Özellikler:
├─ Gelişmiş arama (Elasticsearch)
├─ AI öneri sistemi
├─ Comment sistemi
├─ Study groups
├─ Gamification (points, badges)
├─ Premium abonelik
├─ Kredi sistemi
├─ Ödeme entegrasyonu (Iyzico)
├─ Email marketing
└─ Analytics dashboard
```

### 🎯 **7.3. Version 2.0 - 6 Ay**

#### **Ay 7-12: Ekosistem Genişletme**
```
Özellikler:
├─ Mobil uygulama (React Native)
├─ AI Study Assistant (ChatGPT entegrasyon)
├─ OCR ile el yazısı tanıma
├─ Soru-Cevap forumu
├─ Mentörlük sistemi
├─ Live study sessions
├─ Flashcard creator
├─ Progress tracking
├─ Üniversite admin paneli
└─ Marketplace
```

---

## 8. GÜVENLİK VE UYUMLULUK

### 🔒 **8.1. Güvenlik Önlemleri**

#### **Veri Güvenliği**
```
Önlemler:
├─ HTTPS (SSL/TLS) zorunlu
├─ Data encryption (at rest & in transit)
├─ Password hashing (bcrypt)
├─ JWT token yönetimi
├─ Rate limiting (brute force koruması)
├─ SQL injection koruması
├─ XSS koruması
├─ CSRF token
├─ File upload güvenliği
│   ├─ Virus scanning (ClamAV)
│   ├─ File type validation
│   └─ Size limitation
├─ Regular security audits
├─ Penetration testing
└─ Bug bounty programı
```

#### **Kullanıcı Gizliliği**
```
KVKK (Kişisel Verilerin Korunması) Uyumu:
├─ Explicit consent (açık rıza)
├─ Privacy policy
├─ Data portability
├─ Right to be forgotten
├─ Data minimization
└─ Security safeguards
```

### ⚖️ **8.2. Yasal Uyumluluk**

#### **Telif Hakları**
```
Önlemler:
├─ DMCA compliance
├─ Copyright strike sistemi
├─ Content ID (duplicate detection)
├─ Orijinallik beyanı
├─ Moderasyon ekibi
├─ Rapor sistemi
└─ Akademik dürüstlük politikası
```

#### **Kullanım Koşulları**
- Terms of Service (TOS)
- Community Guidelines
- Copyright Policy
- Privacy Policy
- Refund Policy

---

## 9. MALİYET ANALİZİ

### 💵 **9.1. Başlangıç Maliyetleri**

```
TOPLAM BAŞLANGIÇ MALİYETİ: ~₺750,000

├─ Development (6 Ay MVP + v1.0)
│   ├─ 2x Full-stack Developer @ ₺25K/ay × 6 = ₺300,000
│   ├─ 1x UI/UX Designer @ ₺15K/ay × 4 = ₺60,000
│   ├─ 1x DevOps Engineer @ ₺20K/ay × 3 = ₺60,000
│   └─ 1x Product Manager @ ₺20K/ay × 6 = ₺120,000
│   Subtotal: ₺540,000
│
├─ Infrastructure (İlk 6 Ay)
│   ├─ Server (AWS/DigitalOcean) = ₺30,000
│   ├─ CDN & Storage = ₺15,000
│   ├─ Database (managed) = ₺10,000
│   ├─ Domain & SSL = ₺2,000
│   └─ Third-party APIs = ₺15,000
│   Subtotal: ₺72,000
│
├─ Legal & Admin
│   ├─ Şirket kurulumu = ₺15,000
│   ├─ Marka tescili = ₺5,000
│   ├─ Avukat danışmanlığı = ₺10,000
│   └─ Muhasebe = ₺8,000
│   Subtotal: ₺38,000
│
├─ Marketing (İlk 3 Ay)
│   ├─ Sosyal medya reklamları = ₺30,000
│   ├─ Influencer işbirlikleri = ₺20,000
│   ├─ SEO & Content = ₺15,000
│   └─ PR & Press release = ₺10,000
│   Subtotal: ₺75,000
│
└─ Contingency (Yedek Bütçe %10)
    └─ ₺72,500
```

### 📊 **9.2. Aylık İşletme Maliyetleri**

```
AYLIK İŞLETME MALİYETİ: ~₺150,000

├─ Personel
│   ├─ Developers (2) = ₺50,000
│   ├─ Support Team (2) = ₺20,000
│   ├─ Marketing (1) = ₺15,000
│   ├─ Product Manager (1) = ₺20,000
│   └─ Moderators (Part-time 3) = ₺10,000
│   Subtotal: ₺115,000
│
├─ Infrastructure
│   ├─ Servers & Cloud = ₺15,000
│   ├─ CDN & Storage = ₺5,000
│   ├─ Database = ₺3,000
│   └─ Third-party services = ₺5,000
│   Subtotal: ₺28,000
│
└─ Other
    ├─ Office & Utilities = ₺3,000
    ├─ Marketing = ₺2,000
    └─ Misc = ₺2,000
    Subtotal: ₺7,000
```

### 💰 **9.3. Break-Even Analizi**

```
Break-Even Point:

Aylık Sabit Maliyet: ₺150,000

Premium User (₺89.99/ay) için:
₺150,000 / ₺89.99 = ~1,667 premium üye

Veya Plus User (₺49.99/ay) için:
₺150,000 / ₺49.99 = ~3,001 plus üye

**Gerçekçi Senaryo (Karma):**
- 1,000 Premium (₺89.99) = ₺89,990
- 1,500 Plus (₺49.99) = ₺74,985
- Kredi satışları = ₺10,000
- Reklamlar = ₺5,000
────────────────────────────────
TOPLAM = ₺179,975 > ₺150,000 ✓

**Break-even ~6-9 ay içinde gerçekleşebilir**
```

---

## 10. PAZARLAMA STRATEJİSİ

### 📣 **10.1. Hedef Kitle Segmentasyonu**

```
Primer Segmentler:
├─ Üniversite 1-2. sınıf öğrencileri (18-20 yaş)
│   ├─ Yeni başlamış, not ihtiyacı yüksek
│   └─ Teknoloji adaptasyonu hızlı
│
├─ Mühendislik/Tıp öğrencileri
│   ├─ Yoğun ders programı
│   └─ Teknik not ihtiyacı
│
└─ Sınava hazırlananlar (KPSS, YKS, TUS)
    ├─ Özel ders alternatifi
    └─ Ücretli içeriğe daha açık
```

### 🎯 **10.2. Pazarlama Kanalları**

#### **1. Sosyal Medya Marketing (%40 bütçe)**
```
Instagram:
├─ Reels (öğrenci hayatı, ders ipuçları)
├─ Stories (günlük içerik)
├─ Influencer collaborations
└─ Paid ads (lookalike audiences)

TikTok:
├─ Viral içerik (study hacks, not teknikleri)
├─ Hashtag challenges (#NotPaylaşımı)
└─ Creator partnerships

Twitter:
├─ Trending topics (sınav dönemleri)
├─ Üniversite hesaplarıyla etkileşim
└─ Akademik tartışmalar

LinkedIn:
├─ B2B için üniversite yöneticileri
└─ Profesyonel içerik
```

#### **2. Content Marketing (%20 bütçe)**
```
Blog:
├─ Çalışma teknikleri
├─ Sınav hazırlık rehberleri
├─ Bölüm tanıtımları
├─ Mezun röportajları
└─ SEO optimize edilmiş makaleler

YouTube:
├─ Platform tanıtımı
├─ Nasıl yapılır videoları
├─ Öğrenci vlog'ları
└─ Webinar kayıtları
```

#### **3. Campus Ambassadors (%15 bütçe)**
```
Program:
├─ Her üniversitede 2-3 elçi
├─ Aylık ₺500 + komisyon
├─ Özel promosyon kodları
├─ Event organizasyonu
└─ Sosyal medya paylaşımları
```

#### **4. Referral Program (%10 bütçe)**
```
Mekanizma:
├─ Her davet = 10 kredi (her iki tarafa)
├─ Premium üye olana bonus
├─ Liderlik tablosu
└─ Aylık ödüller
```

#### **5. Email Marketing (%10 bütçe)**
```
Campaigns:
├─ Welcome series
├─ Weekly highlights
├─ Personalized recommendations
├─ Seasonal campaigns (sınav dönemleri)
└─ Re-engagement campaigns
```

#### **6. SEO & SEM (%5 bütçe)**
```
Stratejiler:
├─ Long-tail keywords
│   └─ "ankara üniversitesi hukuk notları"
├─ Google Ads (branded + generic)
├─ Üniversite/bölüm landing pages
└─ Schema markup (Rich snippets)
```

### 🎁 **10.3. Launch Kampanyası**

```
PRE-LAUNCH (1 Ay Önce):
├─ Teaser campaign
├─ Early access kayıtları
├─ Influencer partnerships
└─ PR makaleleri

LAUNCH DAY:
├─ 🎉 İlk 1000 kullanıcıya Premium (1 ay ücretsiz)
├─ Sosyal medya takeover
├─ Press release
└─ Influencer unboxing/review

POST-LAUNCH (1. Ay):
├─ Referral contest (en çok davet eden kazanır)
├─ Best note competition
├─ Student testimonials
└─ University partnerships announcement
```

---

## 📞 İLETİŞİM VE DESTEK

### 📧 **Destek Kanalları**
- Email: destek@platform.com
- Live Chat (Premium üyeler için)
- WhatsApp Business
- FAQ / Help Center
- Community Forum

### 🎓 **Eğitim ve Kaynak**
- Video tutorials
- Blog yazıları
- Webinar'lar
- Best practices guide

---

## ✅ SONUÇ

Bu proje planı, CourseHero benzeri kapsamlı bir not paylaşım platformu oluşturmak için gerekli tüm detayları içermektedir:

✅ **Teknik Mimari:** Ölçeklenebilir, modern stack  
✅ **Özellikler:** Kullanıcı dostu, AI destekli  
✅ **İş Modeli:** Sürdürülebilir, çoklu gelir kaynağı  
✅ **Pazarlama:** Hedef odaklı, ölçülebilir  
✅ **Maliyetler:** Gerçekçi, detaylı analiz  
✅ **Büyüme:** Aşamalı, kontrollü genişleme  

**Başarı için kritik faktörler:**
1. Kullanıcı deneyimine odaklanma
2. Kaliteli içerik kontrolü
3. Güçlü topluluk oluşturma
4. Sürekli iyileştirme ve inovasyon
5. Yasal ve etik kurallara uyum

**Projeyi hayata geçirmek için sonraki adımlar:**
1. Ekip oluşturma
2. Seed funding (₺750K)
3. MVP geliştirme (3 ay)
4. Beta testing (100 kullanıcı)
5. Resmi lansman

---

**Hazırlayan:** AI Assistant  
**Tarih:** 22 Ekim 2025  
**Versiyon:** 2.0  
**Durum:** Uygulamaya Hazır

---

## 📚 EKLER

### Ek A: API Dokümantasyonu (Örnek)
### Ek B: Veritabanı ER Diagram
### Ek C: UI/UX Mockup'lar
### Ek D: Finansal Projeksiyonlar (Excel)
### Ek E: Legal Dokümanlar Şablonları

---

**NOT:** Bu proje planı genel bir şablondur. Spesifik uygulamada lokal pazar koşulları, yasal gereklilikler ve teknik kısıtlamalar dikkate alınmalıdır.
