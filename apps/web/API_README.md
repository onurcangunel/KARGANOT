# 🦅 KARGANOT MVP API Documentation

## 📋 Overview
KARGANOT MVP REST API v1 - Öğrenciden öğrenciye not paylaşım platformu

**Base URL:** `http://localhost:3000/api/v1`

**Authentication:** Bearer JWT Token

**Response Format:**
```json
{
  "ok": true|false,
  "data": {},
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "fields": {}
  }
}
```

---

## 🔐 Authentication Endpoints

### POST /auth/register
Yeni kullanıcı kaydı

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "universityId": "optional-uuid",
  "departmentId": "optional-uuid"
}
```

**Response:** `201 Created`
```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "clxxx",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "plan": "FREE",
      "createdAt": "2025-10-28T..."
    },
    "message": "Kayıt başarılı! Giriş yapabilirsiniz."
  }
}
```

---

### POST /auth/login
Kullanıcı girişi

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "clxxx",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "plan": "FREE",
      "monthlyDownloadQuota": 3,
      "monthlyDownloadUsed": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

---

## 🏫 Universities Endpoints

### GET /universities
Üniversite listesi

**Query Parameters:**
- `search` (optional): Arama terimi
- `city` (optional): Şehir filtresi
- `type` (optional): "state" | "foundation"
- `page` (optional): Sayfa numarası (default: 1)
- `limit` (optional): Sayfa başına kayıt (default: 20, max: 100)

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "universities": [
      {
        "id": "clxxx",
        "name": "Orta Doğu Teknik Üniversitesi",
        "slug": "odtu",
        "city": "Ankara",
        "type": "state",
        "isActive": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

### GET /universities/:id/faculties
Üniversiteye ait fakülteler

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "faculties": [
      {
        "id": "clxxx",
        "name": "Mühendislik Fakültesi",
        "slug": "muhendislik",
        "universityId": "clxxx",
        "isActive": true
      }
    ]
  }
}
```

---

## 📄 Notes Endpoints

### GET /notes
Not listesi

**Query Parameters:**
- `courseId` (optional): Ders ID
- `status` (optional): "PENDING" | "APPROVED" | "REJECTED" | "REMOVED"
- `page` (optional): Sayfa numarası
- `limit` (optional): Sayfa başına kayıt
- `sort` (optional): "recent" | "popular" | "rating"

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "notes": [
      {
        "id": "clxxx",
        "title": "Devre Teorisi - Hafta 1",
        "description": "Temel devre analizi",
        "courseId": "clxxx",
        "uploaderId": "clxxx",
        "uploader": {
          "name": "John Doe"
        },
        "fileExt": "pdf",
        "pages": 15,
        "downloads": 42,
        "views": 150,
        "avgRating": 4.5,
        "status": "APPROVED",
        "createdAt": "2025-10-28T..."
      }
    ],
    "pagination": {...}
  }
}
```

---

### POST /notes/:id/download
Not indirme (Quota kontrolü)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "downloadUrl": "https://s3.aws.com/signed-url...",
    "expiresIn": 300,
    "remainingQuota": 2
  }
}
```

**Error:** `429 Too Many Requests` (Quota exceeded)
```json
{
  "ok": false,
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "Aylık indirme kotanız doldu"
  }
}
```

---

### POST /notes/:id/ratings
Not değerlendirme

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Çok faydalı notlar!"
}
```

**Response:** `201 Created`

---

## 🔍 Search Endpoints

### GET /search
Not arama (OCR destekli)

**Query Parameters:**
- `q` (required): Arama terimi
- `universityId` (optional)
- `facultyId` (optional)
- `departmentId` (optional)
- `courseId` (optional)
- `page` (optional)
- `limit` (optional)

**Response:** `200 OK`

---

## 💳 Payments Endpoints

### POST /payments/subscribe
Premium abonelik satın alma

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "provider": "iyzico",
  "planId": "premium-monthly"
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "paymentUrl": "https://sandbox-payment.iyzipay.com/...",
    "transactionId": "clxxx"
  }
}
```

---

### POST /payments/webhook/iyzico
İyzico webhook handler (Signature verification)

---

## 🛠️ Admin Endpoints

### GET /admin/notes?status=pending
Moderasyon kuyruğu

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response:** `200 OK`

---

### POST /admin/notes/:id/approve
Not onaylama

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response:** `200 OK`

---

### POST /admin/notes/:id/reject
Not reddetme

**Request Body:**
```json
{
  "reason": "Okunaksız içerik"
}
```

---

## 📊 Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 422 | Form doğrulama hatası |
| `UNAUTHORIZED` | 401 | Oturum gerekli |
| `FORBIDDEN` | 403 | Yetki yok |
| `NOT_FOUND` | 404 | Kayıt bulunamadı |
| `EMAIL_EXISTS` | 409 | E-posta zaten kullanımda |
| `QUOTA_EXCEEDED` | 429 | İndirme kotası doldu |
| `RATE_LIMIT` | 429 | Çok fazla istek |
| `INTERNAL_ERROR` | 500 | Sunucu hatası |

---

## 🧪 Testing

### Test Credentials
```
Admin: admin@karganot.com / 12345
Test:  test@karganot.com / 12345
```

### Postman Collection
Import `KARGANOT_MVP.postman_collection.json`

---

## 🚀 Next Steps

1. ✅ Auth endpoints (register, login, refresh, logout)
2. ✅ Universities hierarchy (universities, faculties, departments, courses)
3. ✅ Notes CRUD (list, detail, download with quota, ratings, report)
4. ⏳ Search with Elasticsearch
5. ⏳ Payments integration (İyzico/PayTR)
6. ✅ Admin moderation panel (approve, reject notes)
