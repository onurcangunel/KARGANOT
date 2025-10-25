# YÖK ATLAS Python API Service

Python FastAPI servisi - YÖK ATLAS verilerini Next.js'e sunar.

## 🚀 Kurulum

```bash
cd python-api

# Virtual environment oluştur
python3 -m venv venv

# Aktifle
source venv/bin/activate  # Mac/Linux
# veya
venv\Scripts\activate     # Windows

# Dependencies kur
pip install -r requirements.txt
```

## ▶️ Çalıştırma

### Manuel:
```bash
python main.py
```

### Script ile:
```bash
chmod +x start.sh
./start.sh
```

API şu adreste çalışacak: **http://localhost:8000**

## 📡 API Endpoints

### 1. Tüm Üniversiteler
```bash
GET http://localhost:8000/universities
```

### 2. Üniversitenin Fakülteleri
```bash
GET http://localhost:8000/faculties?universityId=123
```

### 3. Fakültenin Programları
```bash
GET http://localhost:8000/programs?universityId=123&facultyName=Mühendislik
```

### 4. Program Arama (Fuzzy Search)
```bash
GET http://localhost:8000/search?uni_adi=boğaziçi&program_adi=bilgisayar
```

## 🧪 Test

```bash
# API'yi test et
curl http://localhost:8000/universities

# Belirli bir üniversiteyi ara
curl "http://localhost:8000/search?uni_adi=odtü"

# Program ara
curl "http://localhost:8000/search?program_adi=bilgisayar&sehir=ankara"
```

## 📦 Dependencies

- **FastAPI**: Modern Python web framework
- **yokatlas-py**: YÖK ATLAS veri kütüphanesi
- **uvicorn**: ASGI server
- **httpx**: HTTP client

## 🔄 Next.js Entegrasyonu

Next.js API (`/apps/web/src/app/api/yokatlas/route.ts`) otomatik olarak bu servise bağlanır:

```typescript
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'
```

## 🌐 Production Deployment

### Railway / Render / Heroku:

1. Bu klasörü git repo yapın
2. `Procfile` ekleyin:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```
3. Deploy edin
4. Next.js'te env variable ekleyin:
```bash
PYTHON_API_URL=https://your-python-api.railway.app
```

## 📝 Lisans

MIT License - yokatlas-py kütüphanesi kullanılmıştır.