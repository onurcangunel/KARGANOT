# ✅ AŞAMA 1 DEVAM - Hızlı Versiyon

## Durum

Backend hazır! Şimdi frontend sayfalarını yapacağız.

## Yapmamız Gerekenler

### 1. **app/login/page.tsx**
```
- Email + Password form
- NextAuth signIn() kullan
- Validation (Zod)
- Error handling
- Success → /profile redirect
- Modern Tailwind design
```

### 2. **app/register/page.tsx**
```
- Name, Email, Password, Confirm fields
- Validation: min 8 char, 1 upper, 1 lower, 1 number
- POST /api/auth/register
- Success → auto login → /profile
- "Giriş yap" linki
```

### 3. **app/providers.tsx + layout.tsx**
```
- SessionProvider wrapper
- Layout'a ekle
```

### 4. **app/profile/page.tsx**
```
- Protected route
- useSession() ile user data
- User info card (name, email)
- "Çıkış Yap" button
- Stats (mock: 0 not, 0 puan)
```

### 5. **components/Navbar.tsx** (Bonus)
```
- Logo + nav links
- Login durumuna göre:
  • Giriş yapılı: Profile dropdown, Çıkış
  • Yapılmamış: Giriş/Kayıt butonları
- useSession() conditional
- Responsive
```

## İstediğim Çıktı

Her dosya için:
```typescript
// DOSYA: [yol]
'use client'

// Tam çalışır kod
// Import'lar dahil
// Comment'lerle açıklama
```

## Tasarım

- **Renkler:** Blue (#3B82F6), Green, Red
- **Style:** Modern, rounded, shadows, smooth transitions
- **Form:** w-full px-4 py-2 border rounded-lg focus:ring-2

## Test Senaryoları

```bash
1. Register: test@example.com / Test123456
   → Otomatik login → /profile ✅

2. Login: Aynı bilgilerle
   → /profile ✅

3. /profile'e giriş yapmadan git
   → /login redirect ✅

4. Sayfayı yenile
   → Session korunsun ✅
```

## Beklentilerim

✅ Kopyala-yapıştır hazır kod  
✅ Her dosya için açıklama  
✅ Ekstra paket varsa söyle  
✅ Nasıl test edeceğim?

---

**Hadi başla! Login sayfasından başlayalım! 🚀**
