## YÖK Atlas Scraper ve Arama Modülü

Bu belge, YÖK Atlas’tan üniversite → fakülte → bölüm hiyerarşisini JSON olarak dışa aktaran `scripts/yok-scraper.js` ve KARGANOT içinde arama modülü entegrasyonunu açıklar.

### Çalıştırma

1) Bağımlılıklar (root):

```bash
npm install axios cheerio --no-package-lock --force
```

Not: macOS’ta npm cache izin sorunları için:

```bash
sudo chown -R $UID:$(id -g) ~/.npm
```

2) Scraper’ı çalıştır:

```bash
npm run yok:scrape
```

Çıktı: `apps/web/src/data/yok-data.json`

### Backend (NestJS) TR Alias Endpoint’leri

- `GET /api/v1/universiteler?search=istanbul` → `[ { id, ad, sehir } ]`
- `GET /api/v1/universiteler/:id/fakulteler` → `[ { id, ad } ]`
- `GET /api/v1/fakulteler/:id/bolumler` → `[ { id, ad } ]`

### Frontend (Next.js) UniversitySelector

Kullanım örneği:

```tsx
import UniversitySelector from '@/components/UniversitySelector';

export default function Page() {
  return <UniversitySelector />;
}
```

Kurulum: `apps/web` içinde axios yüklü olmalı (mevcut projede bulunuyor).
