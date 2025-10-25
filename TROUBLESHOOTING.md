# ⚠️ HATA GİDERME KILAVUZU

Bu dosya, kurulum ve çalıştırma sırasında karşılaşabileceğiniz hataları ve çözümlerini içerir.

## 📋 İçindekiler
1. [Kurulum Hataları](#kurulum-hataları)
2. [Docker Hataları](#docker-hataları)
3. [Database Hataları](#database-hataları)
4. [Prisma Hataları](#prisma-hataları)
5. [Node/NPM Hataları](#nodenpm-hataları)
6. [Port Hataları](#port-hataları)
7. [Domain Hataları](#domain-hataları)

---

## Kurulum Hataları

### ❌ "npm install" çalışmıyor

```bash
# Çözüm 1: Legacy peer deps kullan
npm install --legacy-peer-deps

# Çözüm 2: npm cache temizle
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Çözüm 3: Node version kontrol
node -v  # 18+ olmalı
npm -v   # 9+ olmalı
```

### ❌ "permission denied" hatası

```bash
# Script'lere execute izni ver
chmod +x scripts/install.sh
chmod +x scripts/dev.sh
chmod +x scripts/deploy.sh
chmod +x START.sh

# Veya hepsini birden
chmod +x scripts/*.sh START.sh
```

### ❌ ".env file not found"

```bash
# .env dosyası oluştur
cp .env.example .env

# Manuel oluştur
touch .env
```

---

## Docker Hataları

### ❌ "Cannot connect to Docker daemon"

```bash
# Docker Desktop'ı başlat (macOS/Windows)
# Linux için:
sudo systemctl start docker

# Docker durumunu kontrol et
docker ps
```

### ❌ "Port already in use"

```bash
# Hangi portlar kullanılıyor kontrol et
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :9000  # MinIO

# Çalışan container'ı durdur
docker-compose down

# Tüm container'ları durdur
docker stop $(docker ps -aq)

# Portları temizle
docker-compose down -v
```

### ❌ Docker container çalışmıyor

```bash
# Container loglarını kontrol et
docker-compose logs postgres
docker-compose logs redis

# Container'ları yeniden başlat
docker-compose restart

# Temiz başlangıç
docker-compose down -v
docker-compose up -d
```

---

## Database Hataları

### ❌ "Database connection failed"

```bash
# 1. Docker PostgreSQL çalışıyor mu?
docker ps | grep postgres

# 2. DATABASE_URL doğru mu?
# .env dosyasını kontrol et:
DATABASE_URL="postgresql://karganot:karganot123@localhost:5432/karganot"

# 3. Database hazır mı? 10 saniye bekle
sleep 10

# 4. Connection test
docker exec -it karganot-postgres psql -U karganot -d karganot -c "SELECT 1;"
```

### ❌ "Database does not exist"

```bash
# Database oluştur
docker exec -it karganot-postgres psql -U karganot -c "CREATE DATABASE karganot;"

# Veya migration çalıştır
cd apps/api
npx prisma migrate dev --name init
```

### ❌ "Too many connections"

```bash
# PostgreSQL yeniden başlat
docker-compose restart postgres

# Connection pooling ayarla (Prisma)
# DATABASE_URL sonuna ekle: ?connection_limit=5
```

---

## Prisma Hataları

### ❌ "Prisma Client not generated"

```bash
cd apps/api
npx prisma generate
```

### ❌ "Migration failed"

```bash
# Migration reset
cd apps/api
npx prisma migrate reset

# Yeni migration
npx prisma migrate dev --name init

# Force migration (dikkatli!)
npx prisma db push
```

### ❌ "Schema validation error"

```bash
# Schema'yı format et
cd apps/api
npx prisma format

# Validation
npx prisma validate
```

### ❌ "Prisma Studio açılmıyor"

```bash
# Port değiştir
cd apps/api
npx prisma studio --port 5556

# Browser açık değilse manuel aç
# http://localhost:5555
```

---

## Node/NPM Hataları

### ❌ "Module not found"

```bash
# Dependencies yeniden yükle
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Spesifik modül için
npm install <module-name> --legacy-peer-deps
```

### ❌ "ERR_PNPM_PEER_DEP_ISSUES"

```bash
# --legacy-peer-deps kullan
npm install --legacy-peer-deps
```

### ❌ "EACCES: permission denied"

```bash
# sudo KULLANMAYIN! npm ownership değiştir
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### ❌ "heap out of memory"

```bash
# Node memory limit artır
export NODE_OPTIONS="--max-old-space-size=4096"

# Veya package.json'da:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

---

## Port Hataları

### ❌ "Port 3000 already in use"

```bash
# Port'u öldür
lsof -ti:3000 | xargs kill -9

# Veya farklı port kullan
cd apps/web
npm run dev -- -p 3001
```

### ❌ "Port 4000 already in use"

```bash
# Port'u öldür
lsof -ti:4000 | xargs kill -9

# Veya .env'de değiştir
PORT=4001
```

### ❌ "Address already in use"

```bash
# Tüm Node process'leri öldür
killall node

# Spesifik portları kontrol et
lsof -i :3000
lsof -i :4000
lsof -i :5432
```

---

## Domain Hataları

### ❌ "Domain not resolving"

```bash
# DNS propagation kontrol et
dig karganot.com
nslookup karganot.com

# DNS cache temizle
# macOS:
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Linux:
sudo systemd-resolve --flush-caches

# Windows:
ipconfig /flushdns
```

### ❌ "SSL certificate error"

```bash
# Vercel/Railway otomatik SSL sağlar
# 24-48 saat bekleyin

# Manuel kontrol:
openssl s_client -connect karganot.com:443
```

### ❌ "CORS error in production"

```javascript
// apps/api/src/main.ts
app.enableCors({
  origin: ['https://karganot.com', 'https://www.karganot.com'],
  credentials: true,
});
```

---

## Genel Hata Giderme Adımları

### 🔄 Tam Reset (Her Şeyi Sıfırla)

```bash
# 1. Tüm process'leri durdur
killall node
docker-compose down -v

# 2. Tüm dependencies'i temizle
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/package-lock.json
rm -rf apps/api/node_modules apps/api/package-lock.json

# 3. Cache temizle
npm cache clean --force

# 4. Yeniden kur
npm install --legacy-peer-deps
cd apps/web && npm install --legacy-peer-deps && cd ../..
cd apps/api && npm install --legacy-peer-deps && cd ../..

# 5. Docker yeniden başlat
docker-compose up -d
sleep 10

# 6. Prisma reset
cd apps/api
npx prisma generate
npx prisma migrate reset
cd ../..

# 7. Çalıştır
npm run dev
```

---

## Yardım Almak

Hala sorun mu yaşıyorsunuz?

1. **Logları kontrol edin:**
   ```bash
   # Backend logs
   cd apps/api && npm run start:dev
   
   # Frontend logs
   cd apps/web && npm run dev
   
   # Docker logs
   docker-compose logs -f
   ```

2. **Error mesajını kopyalayın** ve arayın

3. **GitHub Issues** oluşturun:
   - Error mesajı
   - Kullandığınız komut
   - Sistem bilgisi (OS, Node version)

4. **Stack Overflow** sorun

5. **Email:** destek@karganot.com

---

## Sistem Gereksinimleri

Minimum:
- Node.js 18+
- npm 9+
- Docker Desktop
- 4GB RAM
- 10GB disk space

Önerilen:
- Node.js 20+
- npm 10+
- 8GB RAM
- 20GB disk space

---

## Faydalı Komutlar

```bash
# Sistem bilgisi
node -v
npm -v
docker -v
docker-compose -v

# Port kontrol
lsof -i :3000
lsof -i :4000
lsof -i :5432

# Process kontrol
ps aux | grep node
ps aux | grep docker

# Disk kullanımı
du -sh node_modules
docker system df

# Temizlik
docker system prune -a
npm cache clean --force
```

---

**💡 İpucu:** Sorun yaşadığınızda önce bu dökümanı kontrol edin!
