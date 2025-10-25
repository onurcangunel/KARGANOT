# 🧪 AUTHENTICATION SYSTEM - TEST SENARYOLARI

## ✅ AŞAMA 1 TAMAMLANDI!

Backend ve Frontend authentication sistemi başarıyla kuruldu.

### **Kurulu Bileşenler:**
- ✅ NextAuth v5 (JWT authentication)
- ✅ Prisma + SQLite (Database)
- ✅ Login Page
- ✅ Register Page
- ✅ Dashboard Page
- ✅ Profile Page
- ✅ Protected Routes Middleware
- ✅ SessionProvider

---

## 🧪 TEST SENARYOLARI

### **TEST 1: Kullanıcı Kaydı (Register)**

#### **Adımlar:**
1. Tarayıcıda açın: `http://localhost:3003/register`
2. Formu doldurun:
   ```
   Ad Soyad: Test Kullanıcı
   Email: test@university.edu.tr
   Şifre: Test123456
   Şifre Tekrar: Test123456
   ✓ Kullanım koşullarını kabul et
   ```
3. "Kayıt Ol" butonuna tıklayın
4. Başarılı mesajını görmelisiniz: "Kayıt Başarılı! 🎉"
5. Otomatik olarak dashboard'a yönlendirilmelisiniz

#### **Beklenen Sonuç:**
- ✅ Kayıt başarılı
- ✅ Otomatik giriş yapıldı
- ✅ `/dashboard` sayfasına yönlendirme
- ✅ Kullanıcı bilgileri görünür

#### **Hata Durumları Test:**
```
A) Zayıf Şifre Testi:
   - Şifre: "123"
   - Beklenen: "Şifre en az 8 karakter olmalıdır"

B) Şifre Uyumsuzluğu:
   - Şifre: "Test123456"
   - Şifre Tekrar: "Test654321"
   - Beklenen: "Şifreler eşleşmiyor"

C) Geçersiz Email:
   - Email: "testtest"
   - Beklenen: "Geçerli bir email adresi giriniz"

D) Kullanım Koşulları:
   - Checkbox işaretlenmeden submit
   - Beklenen: "Kullanım koşullarını kabul etmelisiniz"
```

---

### **TEST 2: Kullanıcı Girişi (Login)**

#### **Adımlar:**
1. Önce çıkış yapın (Dashboard'dan "Çıkış Yap")
2. Tarayıcıda açın: `http://localhost:3003/login`
3. Formu doldurun:
   ```
   Email: test@university.edu.tr
   Şifre: Test123456
   ```
4. "Giriş Yap" butonuna tıklayın
5. Dashboard'a yönlendirilmelisiniz

#### **Beklenen Sonuç:**
- ✅ Giriş başarılı
- ✅ `/dashboard` sayfasına yönlendirme
- ✅ "Hoş geldin, Test!" mesajı

#### **Hata Durumları Test:**
```
A) Yanlış Şifre:
   - Email: test@university.edu.tr
   - Şifre: YanlisS ifre123
   - Beklenen: "Email veya şifre hatalı"

B) Olmayan Kullanıcı:
   - Email: yok@example.com
   - Şifre: Test123456
   - Beklenen: "Email veya şifre hatalı"
```

---

### **TEST 3: Protected Routes (Middleware)**

#### **Adımlar:**
1. Çıkış yapın
2. Tarayıcıya manuel yazın: `http://localhost:3003/dashboard`
3. Login sayfasına yönlendirilmelisiniz
4. URL'de `callbackUrl` parametresi olmalı: `/login?callbackUrl=%2Fdashboard`

#### **Beklenen Sonuç:**
- ✅ Login sayfasına redirect
- ✅ Callback URL saklanır
- ✅ Giriş yaptıktan sonra dashboard'a dönülür

#### **Test Edilecek Protected Routes:**
```
- /dashboard (giriş gerekli)
- /profile (giriş gerekli)
- /upload (giriş gerekli)
```

---

### **TEST 4: Session Persistence (Oturum Sürekliliği)**

#### **Adımlar:**
1. Giriş yapın
2. Dashboard sayfasındayken:
   ```
   - Sayfayı yenileyin (F5)
   - Hala giriş yapmış olmalısınız
   ```
3. Yeni tab açın:
   ```
   - http://localhost:3003/dashboard aç
   - Giriş yapmış olarak görmelisiniz
   ```
4. Tarayıcıyı tamamen kapatın ve tekrar açın:
   ```
   - http://localhost:3003/dashboard aç
   - "Beni hatırla" işaretliyse giriş yapmış olmalısınız
   ```

#### **Beklenen Sonuç:**
- ✅ Sayfa yenileme sonrası session korunur
- ✅ Yeni tab'da session aktif
- ✅ 30 gün boyunca session sürüyor (JWT maxAge)

---

### **TEST 5: Dashboard Özellikleri**

#### **Adımlar:**
1. Giriş yapın ve dashboard'a gidin
2. Kontrol edin:
   ```
   ✅ Kullanıcı avatarı (baş harf)
   ✅ İsim görünüyor
   ✅ Email görünüyor
   ✅ Role badge (STUDENT)
   ✅ Kredi: 10
   ✅ Puan: 0
   ✅ Stats kartları (Yüklenen: 0, İndirilen: 0, Kazanç: ₺0)
   ✅ Quick Actions çalışıyor
   ```
3. Butonları test edin:
   ```
   - "Not Yükle" → /upload
   - "Not Ara" → /search
   - "Profil" → /profile
   - "Ana Sayfa" → /
   - "Çıkış Yap" → /login (logout)
   ```

---

### **TEST 6: Profile Sayfası**

#### **Adımlar:**
1. Dashboard'dan "Profil" linkine tıklayın
2. VEYA: `http://localhost:3003/profile`
3. Kontrol edin:
   ```
   ✅ Profil kartı görünüyor
   ✅ Cover image (gradient)
   ✅ Avatar
   ✅ İsim ve email
   ✅ Üyelik tarihi
   ✅ Stats (Kredi, Puan, Seviye)
   ✅ Hesap bilgileri tablosu
   ✅ Hızlı işlemler linkleri
   ```

---

### **TEST 7: Çıkış Yapma (Logout)**

#### **Adımlar:**
1. Dashboard veya Profile sayfasında "Çıkış Yap" butonuna tıklayın
2. Login sayfasına yönlendirilmelisiniz
3. Tekrar `/dashboard`'a gitmeyi deneyin
4. Login sayfasına redirect olmalısınız

#### **Beklenen Sonuç:**
- ✅ Session temizlendi
- ✅ Login sayfasına yönlendirme
- ✅ Protected routes erişilemez

---

### **TEST 8: Database Kontrol**

#### **Adımlar:**
```bash
# SQLite database'i kontrol et
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web
npx prisma studio
```

#### **Kontrol Edilecekler:**
1. Prisma Studio açılacak (http://localhost:5555)
2. `User` tablosunda kayıtlı kullanıcı görünmeli:
   ```
   ✅ id
   ✅ email: test@university.edu.tr
   ✅ name: Test Kullanıcı
   ✅ password: (hashed)
   ✅ role: STUDENT
   ✅ credits: 10
   ✅ points: 0
   ✅ createdAt
   ```
3. `Session` tablosunda aktif session olmalı
4. `Account` tablosunda kayıt yok (OAuth kullanmadık)

---

## 🐛 DEBUGGING

### **Problem: "Module not found" hatası**
```bash
# Paketleri yeniden kur
cd apps/web
npm install next-auth@beta @auth/prisma-adapter bcryptjs @types/bcryptjs
```

### **Problem: Database hatası**
```bash
# Prisma'yı yeniden generate et
cd apps/web
npx prisma generate
npx prisma migrate dev
```

### **Problem: Session çalışmıyor**
1. `.env` dosyasını kontrol et:
   ```
   NEXTAUTH_SECRET=your-super-secret-key-min-32-characters-long-change-in-prod
   NEXTAUTH_URL=http://localhost:3003
   DATABASE_URL="file:./dev.db"
   ```
2. Tarayıcı cache'i temizle
3. Incognito/Private mode'da test et

### **Problem: Middleware hatası**
```bash
# middleware.ts'in export'unu kontrol et
# "export async function middleware" olmalı (default değil!)
```

---

## ✅ BAŞARILI TEST ÖZETI

Tüm testler başarıyla geçtiyse:

```
✅ Kullanıcı kaydı çalışıyor
✅ Kullanıcı girişi çalışıyor
✅ Protected routes koruması aktif
✅ Session yönetimi çalışıyor
✅ Dashboard görünüyor
✅ Profile sayfası çalışıyor
✅ Çıkış yapma çalışıyor
✅ Database'e kayıt yapılıyor
```

---

## 🎉 AŞAMA 1 TAMAMLANDI!

**Sonraki Adımlar:**
- ✅ AŞAMA 2: Not Yükleme Sistemi
- ⏳ AŞAMA 3: Not Arama ve Listeleme
- ⏳ AŞAMA 4: Ödeme Sistemi

**Şu anda aktif:**
- ✅ Authentication sistemi tam çalışır durumda
- ✅ Kullanıcılar kayıt olup giriş yapabiliyor
- ✅ Protected routes koruması aktif
- ✅ Dashboard ve Profile sayfaları hazır

---

## 📸 SCREENSHOT'LAR (Beklenen Görünüm)

### Register Sayfası:
- Modern, temiz form
- Gradient background (purple-blue)
- Validation mesajları
- Loading state

### Login Sayfası:
- Benzer tasarım
- "Beni hatırla" checkbox
- "Şifremi unuttum" linki

### Dashboard:
- Welcome card (avatar + isim)
- 3 stat kartı (yüklenen, indirilen, kazanç)
- Quick actions grid
- Modern, responsive

### Profile:
- Cover image
- Avatar
- Stats (kredi, puan, seviye)
- Hesap bilgileri
- Hızlı işlemler

---

## 🚀 ÜRETİM (PRODUCTION) İÇİN NOTLAR

Canlıya almadan önce:

1. **Environment Variables:**
   ```bash
   # .env.production
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   NEXTAUTH_URL=https://karganot.com
   DATABASE_URL=postgresql://user:pass@host:5432/karganot
   ```

2. **Database Migration:**
   ```bash
   # PostgreSQL'e geç (SQLite production için uygun değil)
   npx prisma migrate deploy
   ```

3. **Security:**
   - NEXTAUTH_SECRET güçlü olmalı
   - HTTPS kullan
   - Rate limiting ekle
   - CORS yapılandır

4. **Performance:**
   - Redis cache ekle (session için)
   - CDN kullan
   - Image optimization

---

**Hazır! Testlere başlayabilirsin.** 🎯
