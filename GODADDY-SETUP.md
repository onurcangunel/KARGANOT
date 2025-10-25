# 🌐 GoDaddy ile karganot.com Bağlama Rehberi

## HIZLI ÖZET (5 Dakikada Tamamla)

1. **GoDaddy DNS Ayarları** (5 dk)
2. **Vercel'e Deploy** (3 dk)  
3. **Vercel'de Domain Ekle** (2 dk)
4. **Railway'e Deploy** (3 dk) - Opsiyonel, sonra yapabilirsiniz
5. **Bekle** (24-48 saat DNS propagation)

---

## 1️⃣ GoDaddy DNS Ayarları (ŞİMDİ YAPILACAK)

### Adım 1: GoDaddy'ye Giriş Yapın
1. https://www.godaddy.com/tr adresine git
2. Giriş yap
3. **Ürünlerim** → **Tüm Ürünler ve Hizmetler**
4. **Domains** altında `karganot.com` yanındaki **DNS** butonuna tıkla

### Adım 2: DNS Kayıtlarını Düzenle

**ÖNEMLİ:** Önce mevcut kayıtları silmeyin! Sadece yeni kayıtlar ekleyin.

#### A Kaydı Ekle (Ana Domain için)

```
Type: A
Name: @ 
Value: 76.76.21.21
TTL: 600 (veya Custom → 600)
```

**Nasıl Eklerim?**
- "Kayıt Ekle" veya "Add" butonuna tıkla
- Type: A seç
- Name: @ yaz (boş bırakma, @ yaz)
- Value: 76.76.21.21 yaz
- Kaydet

#### CNAME Kayıtları Ekle

**WWW için:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

**API için (Şimdilik atlayabilirsiniz, backend deploy sonrası eklersiniz):**
```
Type: CNAME
Name: api
Value: karganot-api.up.railway.app
TTL: 600
```

### Adım 3: Kaydet ve Bekle
- Değişiklikleri kaydet
- DNS propagation 10 dakika - 48 saat arası sürebilir
- Genelde 10-30 dakikada aktif olur

---

## 2️⃣ Vercel'e Deploy (Frontend)

### Adım 1: Vercel Hesabı Aç
1. https://vercel.com adresine git
2. **Sign Up** → GitHub ile giriş yap (önerilir)
3. Ücretsiz hesap yeterli

### Adım 2: GitHub'a Proje Yükle (Opsiyonel)

**GitHub kullanmak istemiyorsanız, direkt Vercel CLI kullanın (Adım 3)**

```bash
cd /Users/onurcangunel/Desktop/KARGANOT

# Git init (eğer yoksa)
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur ve push et
git remote add origin https://github.com/kullaniciadi/karganot.git
git push -u origin main
```

### Adım 3: Vercel CLI ile Deploy (KOLAY YOL)

Terminal'de:

```bash
# 1. Vercel CLI yükle
npm install -g vercel

# 2. Frontend dizinine git
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web

# 3. Deploy
vercel

# İlk sorulara cevaplar:
# Set up and deploy? → Y (Yes)
# Which scope? → Kendi hesabınızı seçin
# Link to existing project? → N (No)
# What's your project's name? → karganot-web (veya istediğiniz isim)
# In which directory is your code located? → ./ (enter)
# Want to override settings? → N (No)

# Deploy başlayacak...
# Birkaç dakika bekleyin

# Deployment başarılı olunca size bir URL verecek:
# https://karganot-web-xxx.vercel.app
```

### Adım 4: Production Deploy
```bash
# Şimdi production'a deploy et
vercel --prod

# Bu komut production URL'i verecek
# https://karganot-web.vercel.app gibi
```

---

## 3️⃣ Vercel'de Custom Domain Ekle

### Adım 1: Vercel Dashboard'a Git
1. https://vercel.com/dashboard
2. Projenizi seçin (karganot-web)
3. **Settings** sekmesine tıkla
4. Sol menüden **Domains**'e tıkla

### Adım 2: Domain Ekle
1. **Add Domain** butonuna tıkla
2. `karganot.com` yaz
3. **Add** tıkla

### Adım 3: DNS Doğrulaması
Vercel size şunu söyleyecek:
```
Invalid Configuration
A Record: 76.76.21.21
```

Bu normal! GoDaddy'de zaten A kaydını eklediniz. 
**"Refresh"** butonuna tıklayın, 10-30 dakika sonra ✅ olacak.

### Adım 4: WWW Domain Ekle
1. Tekrar **Add Domain** tıkla
2. `www.karganot.com` yaz
3. **Add** tıkla
4. "Redirect to karganot.com" seçeneğini işaretle

---

## 4️⃣ Environment Variables (Vercel'de)

Vercel Dashboard → Settings → Environment Variables

Bu değişkenleri ekleyin:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_URL=https://karganot.com
NEXTAUTH_SECRET=BURAYA-RANDOM-STRING
NEXTAUTH_URL=https://karganot.com
```

**Random String Oluştur:**
```bash
openssl rand -base64 32
# Çıktıyı kopyala ve NEXTAUTH_SECRET'e yapıştır
```

**Environment Variables nasıl eklenir:**
1. Variable name: `NEXT_PUBLIC_API_URL`
2. Value: `http://localhost:4000/api` (şimdilik local, backend deploy sonrası değiştireceksiniz)
3. **Add** tıkla
4. Diğerleri için tekrarla

**Önemli:** Environment variable ekledikten sonra **Redeploy** yapın:
- Deployments sekmesi → En son deployment → ⋯ (üç nokta) → Redeploy

---

## 5️⃣ DNS Propagation Kontrolü

### Terminal'de Kontrol
```bash
# Domain çözümleniyor mu?
dig karganot.com +short
# Beklenen: 76.76.21.21

nslookup karganot.com
# Beklenen: Vercel IP'si

# Online kontrol
# https://dnschecker.org adresine git
# karganot.com yaz ve kontrol et
```

### Tarayıcıda Test
```
https://karganot.com
```

**İlk 10-30 dakika:** "This site can't be reached" görebilirsiniz (normal)
**30 dakika - 2 saat sonra:** Site açılmalı
**Hala açılmıyorsa:** DNS cache temizleyin:

```bash
# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Chrome'da
chrome://net-internals/#dns → Clear host cache
```

---

## 6️⃣ Backend Deploy (Sonra Yapabilirsiniz)

Backend'i Railway'e deploy etmek için **ayrı bir zamanda** şunu yapın:

```bash
cd /Users/onurcangunel/Desktop/KARGANOT/apps/api

# Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

Detaylar için: `DEPLOYMENT.md` dosyasına bakın

---

## ✅ KONTROL LİSTESİ

### Şu An Yapılması Gerekenler:
- [ ] GoDaddy DNS'e A kaydı eklendi (@ → 76.76.21.21)
- [ ] GoDaddy DNS'e CNAME eklendi (www → cname.vercel-dns.com)
- [ ] Vercel hesabı açıldı
- [ ] Frontend Vercel'e deploy edildi (`vercel --prod`)
- [ ] Vercel'de karganot.com domain eklendi
- [ ] Vercel'de environment variables eklendi
- [ ] Redeploy yapıldı

### Sonra Yapılacaklar (Acele Etmeyin):
- [ ] Railway hesabı aç
- [ ] Backend Railway'e deploy et
- [ ] GoDaddy'e API CNAME ekle
- [ ] Vercel environment'ta API URL güncelle
- [ ] Database production'a migrate et

---

## 🎯 ŞİMDİ NE YAPMALISINIZ?

1. **GoDaddy DNS ayarlarını yapın** (yukarıdaki Adım 1)
2. **Vercel'e deploy edin** (Adım 2-3)
3. **Vercel'de domain ekleyin** (Adım 4)
4. **30 dakika bekleyin** (kahve molası ☕)
5. **https://karganot.com kontrol edin**

---

## 💡 İPUCU

**Acele etmeyin!** Önce frontend'i canlıya alın:
- ✅ karganot.com çalışsın
- ✅ Site açılsın
- ✅ Görsel olarak düzgün olsun

Backend (API) için daha sonra Railway setup yaparsınız. 
Şimdilik local backend ile test edebilirsiniz.

---

## 🆘 SIKÇA SORULAN SORULAR

**S: Domain ne zaman aktif olur?**
C: 10 dakika - 48 saat arası. Genelde 30 dakikada açılır.

**S: "This site can't be reached" diyor?**
C: DNS henüz propagate olmamış. Bekleyin veya DNS cache temizleyin.

**S: SSL hatası alıyorum?**
C: Vercel otomatik SSL sağlar, 24 saat içinde düzelir.

**S: API'yi şimdi deploy etmeli miyim?**
C: Hayır, acele etmeyin. Önce frontend'i çalıştırın.

**S: Vercel ücretsiz mi?**
C: Evet, Hobby plan ücretsiz ve yeterli.

**S: GoDaddy'de başka bir ayar var mı?**
C: Hayır, sadece DNS kayıtları yeterli.

---

## 📞 YARDIM

Takıldığınız bir yer olursa:
1. TROUBLESHOOTING.md dosyasına bakın
2. DNS checker ile kontrol edin: https://dnschecker.org
3. Vercel deployment logs kontrol edin

---

**🎉 Başarılar! 30 dakika sonra karganot.com canlıda olacak! 🚀**
