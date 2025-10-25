#!/bin/bash

# KARGA NOT - Hızlı Hata Düzeltme ve Yeniden Başlatma

echo "🔧 Hataları düzeltiyorum..."

# Backend TypeScript hatalarını düzelt
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api

echo "📦 Backend dependencies kontrol ediliyor..."
if [ ! -d "node_modules/@types/passport" ]; then
    echo "Installing missing types..."
    npm install --save-dev @types/passport @types/qs --legacy-peer-deps
fi

# Frontend environment kontrol
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web

if [ ! -f ".env.local" ]; then
    echo "📝 .env.local oluşturuluyor..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
EOF
fi

cd /Users/onurcangunel/Desktop/KARGANOT

echo ""
echo "✅ Hatalar düzeltildi!"
echo ""
echo "🚀 Serverları yeniden başlatın:"
echo "   ./scripts/dev.sh"
echo ""
echo "veya manuel:"
echo "   Terminal 1: cd apps/api && npm run start:dev"
echo "   Terminal 2: cd apps/web && npm run dev"
echo ""
