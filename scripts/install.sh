#!/bin/bash

set -e  # Exit on error

echo "🚀 KARGA NOT - Otomatik Kurulum Başlıyor..."
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı! Lütfen Node.js 18+ yükleyin.${NC}"
    echo "https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js versiyonu çok düşük. En az v18 gerekli.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) - OK${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker bulunamadı. Docker'ı manuel başlatmanız gerekecek.${NC}"
    SKIP_DOCKER=true
else
    echo -e "${GREEN}✅ Docker $(docker -v) - OK${NC}"
    SKIP_DOCKER=false
fi

echo ""
echo "📝 1/8 - Environment dosyası oluşturuluyor..."

# Create .env file if not exists
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env dosyası oluşturuldu${NC}"
else
    echo -e "${YELLOW}⚠️  .env zaten mevcut, atlanıyor${NC}"
fi

echo ""
echo "📦 2/8 - Root dependencies yükleniyor..."
npm install --legacy-peer-deps

echo ""
echo "📦 3/8 - Frontend dependencies yükleniyor..."
cd apps/web
npm install --legacy-peer-deps
cd ../..

echo ""
echo "📦 4/8 - Backend dependencies yükleniyor..."
cd apps/api
npm install --legacy-peer-deps
cd ../..

if [ "$SKIP_DOCKER" = false ]; then
    echo ""
    echo "🐳 5/8 - Docker servisleri başlatılıyor..."
    docker-compose up -d
    
    echo -e "${GREEN}✅ Docker servisleri başlatıldı${NC}"
    echo "   - PostgreSQL: localhost:5432"
    echo "   - Redis: localhost:6379"
    echo "   - MinIO: localhost:9000, 9001"
    echo "   - MailHog: localhost:1025, 8025"
    
    echo ""
    echo "⏳ Database'in hazır olması bekleniyor (10 saniye)..."
    sleep 10
else
    echo ""
    echo -e "${YELLOW}⚠️  5/8 - Docker atlandı. Manuel olarak başlatmalısınız:${NC}"
    echo "   docker-compose up -d"
fi

echo ""
echo "🔧 6/8 - Prisma Client oluşturuluyor..."
cd apps/api
npx prisma generate

echo ""
echo "🗄️  7/8 - Database migration çalıştırılıyor..."
npx prisma migrate dev --name init --skip-seed || echo -e "${YELLOW}⚠️  Migration hatası (normal olabilir)${NC}"

echo ""
echo "🌱 8/8 - Database seed data ekleniyor..."
npx prisma db seed || echo -e "${YELLOW}⚠️  Seed atlandı (seed script eksik)${NC}"

cd ../..

echo ""
echo "=============================================="
echo -e "${GREEN}🎉 KURULUM TAMAMLANDI!${NC}"
echo "=============================================="
echo ""
echo "📋 Şimdi ne yapmalısınız:"
echo ""
echo "1️⃣  Development serverlarını başlatın:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   ${GREEN}cd apps/api && npm run start:dev${NC}"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   ${GREEN}cd apps/web && npm run dev${NC}"
echo ""
echo "   VEYA tek komutla (root dizinde):"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "2️⃣  Tarayıcınızda açın:"
echo ""
echo "   🌐 Frontend: ${GREEN}http://localhost:3000${NC}"
echo "   🔧 Backend API: ${GREEN}http://localhost:4000/api${NC}"
echo "   📚 API Docs: ${GREEN}http://localhost:4000/api/docs${NC}"
echo "   📧 MailHog: ${GREEN}http://localhost:8025${NC}"
echo "   💾 MinIO: ${GREEN}http://localhost:9001${NC}"
echo ""
echo "3️⃣  Admin kullanıcı oluşturmak için:"
echo "   API Docs'ta (Swagger) POST /api/auth/register endpoint'ini kullanın"
echo ""
echo "=============================================="
echo -e "${GREEN}İyi kodlamalar! 🚀${NC}"
echo "=============================================="
