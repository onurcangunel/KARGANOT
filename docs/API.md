# KARGA NOT API Documentation

## Base URL
```
Development: http://localhost:4000/api
Production: https://api.karganot.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@university.edu.tr",
  "name": "Ahmet Yılmaz",
  "password": "SecurePass123!",
  "university": "Istanbul University"
}

Response: 201 Created
{
  "user": {
    "id": "clx...",
    "email": "student@university.edu.tr",
    "name": "Ahmet Yılmaz",
    "role": "STUDENT"
  },
  "access_token": "eyJhbGci..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@university.edu.tr",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "user": { ... },
  "access_token": "eyJhbGci..."
}
```

### Users

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "clx...",
  "email": "student@university.edu.tr",
  "name": "Ahmet Yılmaz",
  "role": "STUDENT",
  "university": "Istanbul University",
  "balance": 150.50,
  "verified": true
}
```

#### Update Profile
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ahmet Yılmaz Jr.",
  "university": "Bogazici University"
}

Response: 200 OK
```

### Universities

#### List Universities
```http
GET /api/universities?city=Istanbul

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "name": "Istanbul University",
      "city": "Istanbul",
      "code": "IST"
    }
  ],
  "total": 100
}
```

#### Get Departments
```http
GET /api/universities/{universityId}/departments

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "name": "Computer Engineering",
      "code": "CE"
    }
  ]
}
```

#### Get Courses
```http
GET /api/departments/{departmentId}/courses

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "name": "Data Structures",
      "code": "CE201",
      "credits": 4,
      "semester": "Fall"
    }
  ]
}
```

### Notes

#### List Notes
```http
GET /api/notes?university=IST&course=CE201&page=1&limit=20

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "title": "Veri Yapıları Final Notu",
      "description": "2023 Final sınavı için hazırlanmış detaylı not",
      "price": 25.00,
      "thumbnailUrl": "https://...",
      "pageCount": 45,
      "viewCount": 120,
      "seller": {
        "name": "Ali Veli",
        "rating": 4.8
      },
      "university": "Istanbul University",
      "course": "CE201 - Data Structures",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Get Note Details
```http
GET /api/notes/{noteId}

Response: 200 OK
{
  "id": "clx...",
  "title": "Veri Yapıları Final Notu",
  "description": "...",
  "price": 25.00,
  "fileSize": 2048576,
  "fileType": "application/pdf",
  "pageCount": 45,
  "viewCount": 120,
  "reviews": [
    {
      "rating": 5,
      "comment": "Çok faydalı bir not",
      "user": "Ayşe Y.",
      "createdAt": "2024-01-20T15:30:00Z"
    }
  ],
  "averageRating": 4.7,
  "reviewCount": 12
}
```

#### Upload Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Veri Yapıları Final Notu",
  "description": "2023 Final sınavı için hazırlanmış detaylı not",
  "price": 25.00,
  "universityId": "clx...",
  "courseId": "clx...",
  "file": <binary>
}

Response: 201 Created
{
  "id": "clx...",
  "title": "Veri Yapıları Final Notu",
  "status": "PENDING"
}
```

#### Update Note
```http
PUT /api/notes/{noteId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 30.00
}

Response: 200 OK
```

#### Delete Note
```http
DELETE /api/notes/{noteId}
Authorization: Bearer <token>

Response: 204 No Content
```

### Purchases

#### Create Purchase
```http
POST /api/purchases
Authorization: Bearer <token>
Content-Type: application/json

{
  "noteId": "clx...",
  "paymentProvider": "iyzico"
}

Response: 200 OK
{
  "purchaseId": "clx...",
  "checkoutUrl": "https://payment.iyzico.com/...",
  "paymentId": "xyz..."
}
```

#### Get Purchase
```http
GET /api/purchases/{purchaseId}
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "clx...",
  "note": { ... },
  "amount": 25.00,
  "status": "COMPLETED",
  "accessToken": "secure-token-123",
  "createdAt": "2024-01-20T12:00:00Z"
}
```

#### My Purchases
```http
GET /api/purchases/me
Authorization: Bearer <token>

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "note": { ... },
      "amount": 25.00,
      "status": "COMPLETED",
      "createdAt": "2024-01-20T12:00:00Z"
    }
  ]
}
```

### Payments

#### Verify Payment (Webhook)
```http
POST /api/payments/webhook/iyzico
Content-Type: application/json

{
  "status": "success",
  "paymentId": "xyz...",
  "conversationId": "clx..."
}

Response: 200 OK
```

### Admin

#### Pending Notes
```http
GET /api/admin/notes?status=PENDING
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "data": [
    {
      "id": "clx...",
      "title": "...",
      "seller": { ... },
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

#### Approve Note
```http
POST /api/admin/notes/{noteId}/approve
Authorization: Bearer <admin_token>

Response: 200 OK
```

#### Reject Note
```http
POST /api/admin/notes/{noteId}/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Copyright violation"
}

Response: 200 OK
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be a valid email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Note not found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too many requests"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Rate Limiting

- **Default**: 100 requests per minute per IP
- **Auth endpoints**: 5 requests per minute
- **Upload endpoints**: 10 requests per hour

## File Upload Limits

- **Max file size**: 50 MB
- **Allowed types**: PDF, DOCX, JPG, PNG
- **Max page count**: 500 pages

## Payment Flow

1. User initiates purchase
2. Backend creates payment session with iyzico
3. User redirected to iyzico checkout
4. User completes payment
5. iyzico sends webhook to backend
6. Backend verifies payment and grants access
7. User can view note with access token
