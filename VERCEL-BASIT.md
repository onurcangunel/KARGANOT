# 🚀 VERCEL'E DEPLOY - Adım Adım Rehber

## ŞİMDİ YAPACAKLARINIZ (10 Dakika)

### 1️⃣ Terminal'i Açın

Mac'te:
- **Spotlight** açın (⌘ + Space)
- "Terminal" yazın
- Enter'a basın

### 2️⃣ Bu Komutları Sırayla Çalıştırın

**Her komutu kopyalayın, Terminal'e yapıştırın, Enter'a basın:**

```bash
# Adım 1: Vercel CLI yükle (1 dakika)
npm install -g vercel
```

Bekleyin, yükleme bitsin.

```bash
# Adım 2: Proje klasörüne git
cd /Users/onurcangunel/Desktop/KARGANOT/apps/web
```

```bash
# Adım 3: Vercel'e giriş yap
vercel login
```

**Ne olacak:**
- Tarayıcı açılacak
- "Confirm" veya "Verify" butonu göreceksiniz
- Tıklayın
- "Authenticated!" yazısı çıkacak
- Terminal'e dönün

```bash
# Adım 4: Deploy başlat
vercel
```

**SORULAR SORACAK, İŞTE CEVAPLARI:**

---

## ❓ Vercel Size Soracak, Siz Cevap Vereceksiniz:

### Soru 1:
```
? Set up and deploy "~/Desktop/KARGANOT/apps/web"? [Y/n]
```
**Cevap:** `Y` yazın, Enter

---

### Soru 2:
```
? Which scope do you want to deploy to?
```
**Cevap:** Kendi kullanıcı adınızı seçin (ok tuşlarıyla), Enter

---

### Soru 3:
```
? Link to existing project? [y/N]
```
**Cevap:** `N` yazın, Enter

---

### Soru 4:
```
? What's your project's name?
```
**Cevap:** `karganot` yazın, Enter

---

### Soru 5:
```
? In which directory is your code located?
```
**Cevap:** Boş bırakın (sadece Enter'a basın)

---

### Soru 6:
```
? Want to override the settings?
```
**Cevap:** `N` yazın, Enter

---

## ✅ Deploy Başladı!

Terminal'de şöyle şeyler göreceksiniz:
```
🔍 Inspect: https://vercel.com/...
✅ Production: https://karganot-xxx.vercel.app
```

**ÖNEMLİ:** Production URL'i kopyalayın! (karganot-xxx.vercel.app gibi)

---

## 3️⃣ Vercel Dashboard'a Git

1. Tarayıcıda **https://vercel.com/dashboard** açın
2. **"karganot"** projesini göreceksiniz
3. Üzerine tıklayın

---

## 4️⃣ Custom Domain Ekle

Vercel'de projenizin içindesiniz:

### Adım 1: Settings'e Git
- Üstte **"Settings"** sekmesine tıklayın

### Adım 2: Domains'e Git
- Sol menüden **"Domains"** tıklayın

### Adım 3: Domain Ekle
- **"Add"** butonuna tıklayın
- `karganot.com` yazın
- **"Add"** tıklayın

### Adım 4: Doğrulama Bekleyin
Vercel size şunu gösterecek:
```
❌ Invalid Configuration
```

**NORMAL BU!** GoDaddy DNS'in yayılması lazım.

- **"Refresh"** butonuna tıklayın
- Eğer hala ❌ ise → 10-30 dakika bekleyin, sonra tekrar Refresh

---

## 5️⃣ Environment Variables Ekle

Hala Vercel'de, Settings'te:

### Adım 1: Environment Variables'a Git
- Sol menüden **"Environment Variables"** tıklayın

### Adım 2: İlk Variable'ı Ekle

**Variable Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:**
```
http://localhost:4000/api
```

- **"Add"** tıklayın

### Adım 3: İkinci Variable

**Variable Name:**
```
NEXT_PUBLIC_APP_URL
```

**Value:**
```
https://karganot.com
```

- **"Add"** tıklayın

### Adım 4: Üçüncü Variable

**Variable Name:**
```
NEXTAUTH_SECRET
```

**Value:** Terminal'de şunu çalıştırın:
```bash
openssl rand -base64 32
```

Çıkan uzun yazıyı kopyalayıp buraya yapıştırın.

- **"Add"** tıklayın

### Adım 5: Dördüncü Variable

**Variable Name:**
```
NEXTAUTH_URL
```

**Value:**
```
https://karganot.com
```

- **"Add"** tıklayın

---

## 6️⃣ Redeploy Yap

Environment variables eklediğiniz için tekrar deploy etmek gerek:

1. Üstte **"Deployments"** sekmesine tıklayın
2. En üstteki deployment'a tıklayın
3. Sağ üstte **⋯** (üç nokta) tıklayın
4. **"Redeploy"** seçin
5. Popup'ta **"Redeploy"** tıklayın
6. 1-2 dakika bekleyin

---

## 7️⃣ WWW Domain Ekle (Opsiyonel)

Settings → Domains'e geri dönün:

1. **"Add"** tıkla
2. `www.karganot.com` yaz
3. **"Add"** tıkla
4. **"Redirect to karganot.com"** seçeneğini işaretle
5. **"Add"** tıkla

---

## ✅ TAMAMLANDI!

Şimdi yapmanız gereken tek şey:

### 30 Dakika Bekleyin ☕

DNS'in yayılması lazım. Sonra:

**Test edin:**
```
https://karganot.com
```

---

## 🔍 Kontrol:

### Terminal'de:
```bash
dig karganot.com +short
```

**Görmeniz gereken:** `76.76.21.21`

### Tarayıcıda:
```
https://karganot.com
```

**İlk 30 dakika:** "Site can't be reached" görebilirsiniz (normal)
**30 dakika sonra:** Siteniz açılacak! 🎉

---

## ❌ Hata mı Aldınız?

### "Site açılmıyor"
- 30 dakika bekleyin
- DNS cache temizleyin:
```bash
sudo dscacheutil -flushcache
```

### "Build failed"
Vercel Dashboard → Deployments → Son deployment → **View Function Logs**

---

## 📞 Yardım

Hangi adımda takıldınız? Hata mesajı var mı?

**Başarılar! 🚀**
