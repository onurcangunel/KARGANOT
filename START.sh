#!/bin/bash

# KARGA NOT - Quick Start
# Bu script'i çalıştırmak için:
# chmod +x START.sh && ./START.sh

clear

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║               🎓 KARGA NOT - Hızlı Başlangıç 🎓               ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Bu script projenizi otomatik olarak başlatacak."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if setup is already done
if [ ! -d "node_modules" ] || [ ! -d "apps/web/node_modules" ] || [ ! -d "apps/api/node_modules" ]; then
    echo "⚠️  İlk kurulum yapılmamış gibi görünüyor..."
    echo ""
    read -p "Şimdi kurulum yapmak ister misiniz? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🚀 Kurulum başlatılıyor..."
        chmod +x scripts/install.sh
        ./scripts/install.sh
        
        if [ $? -ne 0 ]; then
            echo ""
            echo "❌ Kurulum başarısız oldu!"
            echo "Lütfen INSTALL.md veya COMMANDS.md dosyalarına bakın."
            exit 1
        fi
    else
        echo ""
        echo "Kurulum yapmadan devam ediliyor..."
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Docker is running
if ! docker ps &> /dev/null; then
    echo "⚠️  Docker çalışmıyor gibi görünüyor..."
    echo ""
    read -p "Docker servislerini başlatmak ister misiniz? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🐳 Docker servisleri başlatılıyor..."
        docker-compose up -d
        echo "⏳ Database hazırlanıyor (5 saniye)..."
        sleep 5
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Development serverlar başlatılıyor..."
echo ""

# Start servers
chmod +x scripts/dev.sh
./scripts/dev.sh
