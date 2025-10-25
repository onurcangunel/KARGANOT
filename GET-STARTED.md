╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                 🎓 KARGA NOT - HIZLI BAŞLANGIÇ 🎓                         ║
║                                                                            ║
║          Türkiye Not Paylaşım Platformu - karganot.com                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

## ⚡ 3 ADIMDA ÇALIŞTIR

Terminal'i açın ve bu komutları çalıştırın:

```bash
cd /Users/onurcangunel/Desktop/KARGANOT
chmod +x START.sh scripts/*.sh
./START.sh
```

Bu kadar! Script otomatik olarak her şeyi yapacak.

═══════════════════════════════════════════════════════════════════════════

## 📁 OLUŞTURULAN DOSYALAR

✅ Frontend (Next.js 14)
✅ Backend (NestJS)  
✅ Database Schema (Prisma)
✅ Docker Setup
✅ Domain Config
✅ Deployment Scripts

═══════════════════════════════════════════════════════════════════════════

## 🌐 ERİŞİM ADRESLERİ

LOCAL:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api
- API Docs: http://localhost:4000/api/docs
- Database: http://localhost:5555 (Prisma Studio)

PRODUCTION (karganot.com):
- Frontend: https://karganot.com
- Backend: https://api.karganot.com
- Admin: https://admin.karganot.com

═══════════════════════════════════════════════════════════════════════════

## 👤 TEST KULLANICILAR

Admin:
  📧 admin@karganot.com
  🔑 Admin123!

Öğrenci:
  📧 student@test.com
  🔑 Student123!

═══════════════════════════════════════════════════════════════════════════

## 📚 DÖKÜMANTASYON

INSTALL.md          → Detaylı kurulum
COMMANDS.md         → Tüm terminal komutları
TROUBLESHOOTING.md  → Hata giderme
DOMAIN-SETUP.md     → Domain bağlama (karganot.com)
docs/DEPLOYMENT.md  → Production deploy
docs/API.md         → API endpoints

═══════════════════════════════════════════════════════════════════════════

## 🚀 PRODUCTION DEPLOYMENT

Domain'i bağlamak için:

```bash
# 1. Deployment script'i çalıştır
./scripts/deploy.sh

# 2. Domain DNS ayarları için:
cat DOMAIN-SETUP.md
```

Detaylar: DOMAIN-SETUP.md dosyasında

═══════════════════════════════════════════════════════════════════════════

## ❌ HATA MI ALDINIZ?

1. TROUBLESHOOTING.md dosyasına bakın
2. Docker çalışıyor mu kontrol edin: `docker ps`
3. Port çakışması varsa: `lsof -i :3000`
4. Tam reset için: 
   ```bash
   docker-compose down -v
   rm -rf node_modules
   ./START.sh
   ```

═══════════════════════════════════════════════════════════════════════════

## 🎯 SONRAKİ ADIMLAR

1. ✅ Projeyi çalıştırın: `./START.sh`
2. 🌐 http://localhost:3000 açın
3. 👤 Test kullanıcılarıyla giriş yapın
4. 📝 Not yükleme test edin
5. 🌍 Domain bağlayın: DOMAIN-SETUP.md

═══════════════════════════════════════════════════════════════════════════

🎉 Başarılar! KARGA NOT ile iyi geliştirmeler! 🚀

Destek: destek@karganot.com
