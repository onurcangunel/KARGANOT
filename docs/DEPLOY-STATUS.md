# Karganot Üretim Durum Raporu (HTTPS)

Tarih: 2025-11-09 UTC

## Alan Adları
- karganot.com
- www.karganot.com
- api.karganot.com

## TLS/SSL
- Sertifika Sağlayıcı: Let's Encrypt (R12)
- karganot.com, www.karganot.com
  - Yüklendi ve etkin (Nginx)
  - Bitiş: 2026-02-07
  - Yenileme: Otomatik (cron/systemd timer)
- api.karganot.com
  - Mevcut sertifika geçerli
  - Bitiş: 2026-01-28

## Sağlık Kontrolleri (HTTPS)
- https://karganot.com/ → 200 OK
- https://www.karganot.com/ → 200 OK
- https://karganot.com/api/v1/health → 200 OK
- https://www.karganot.com/api/v1/health → 200 OK

## Altyapı Özet
- Nginx yapı testi: OK
- PM2 süreçleri:
  - karganot-api → online
  - karganot-web → online

## Notlar
- Certbot otomatik yenileme etkin. Sertifika bitiş tarihleri yaklaşırken otomatik yenilenecektir.
- İsteğe bağlı: DNS CAA kaydı eklenebilir (issue "letsencrypt.org").
