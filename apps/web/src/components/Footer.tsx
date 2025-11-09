"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fb] text-sm text-gray-600 py-10 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Company</h3>
            <ul className="space-y-1.5">
              <li><Link href="/hakkimizda" className="hover:text-orange-600">Hakkımızda</Link></li>
              <li><Link href="/kariyer" className="hover:text-orange-600">Kariyer</Link></li>
              <li><Link href="/basin" className="hover:text-orange-600">Basın</Link></li>
              <li><Link href="/iletisim" className="hover:text-orange-600">İletişim</Link></li>
              <li><Link href="/sorumlu-kullanim" className="hover:text-orange-600">Sorumlu Kullanım</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Keşfet</h3>
            <ul className="space-y-1.5">
              <li><Link href="#" className="hover:text-orange-600">iOS Uygulaması</Link></li>
              <li><Link href="#" className="hover:text-orange-600">Android Uygulaması</Link></li>
              <li><Link href="#" className="hover:text-orange-600">Chrome Eklentisi</Link></li>
              <li><Link href="/ogretmen-paneli" className="hover:text-orange-600">Öğretmen Paneli</Link></li>
              <li><Link href="/ortakliklar" className="hover:text-orange-600">Üniversite Ortaklıkları</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Öğrenme Araçları</h3>
            <ul className="space-y-1.5">
              <li><Link href="/belgeler" className="hover:text-orange-600">Ders Notları</Link></li>
              <li><Link href="/sinav-sorulari" className="hover:text-orange-600">Sınav Soruları</Link></li>
              <li><Link href="/odev-cozumleri" className="hover:text-orange-600">Ödev Çözümleri</Link></li>
              <li><Link href="/ozet-kartlari" className="hover:text-orange-600">Özet Kartları</Link></li>
              <li><Link href="/quiz-olusturucu" className="hover:text-orange-600">Quiz Oluşturucu</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Yardım</h3>
            <ul className="space-y-1.5">
              <li><Link href="/sss" className="hover:text-orange-600">Sık Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="hover:text-orange-600">İletişim</Link></li>
              <li><Link href="/sorumlu-kullanim" className="hover:text-orange-600">Sorumlu Kullanım</Link></li>
              <li><Link href="/kilavuz" className="hover:text-orange-600">Platform Kılavuzu</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Hukuki Bilgiler</h3>
            <ul className="space-y-1.5">
              <li><Link href="/telif" className="hover:text-orange-600">Telif Hakkı Politikası</Link></li>
              <li><Link href="/gizlilik" className="hover:text-orange-600">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-orange-600">Kullanım Şartları</Link></li>
              <li><Link href="/akademik-durustluk" className="hover:text-orange-600">Akademik Dürüstlük</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Bize Ulaşın</h3>
            <ul className="space-y-1.5">
              <li><a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600">X (Twitter)</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600">Instagram</a></li>
              <li><a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600">LinkedIn</a></li>
              <li><a href="https://youtube.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600">YouTube</a></li>
              <li><a href="https://tiktok.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center text-gray-500">
          <div className="opacity-80">
            {/* Güvenlik rozeti */}
            <Link href="/gizlilik" className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs text-gray-600 bg-white hover:text-orange-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z"/></svg>
              Veri Güvenliği & Gizlilik
            </Link>
          </div>
          <p>© 2025 KARGANOT. Tüm hakları saklıdır. KARGANOT, herhangi bir üniversiteyle doğrudan bağlantılı değildir.</p>
        </div>
      </div>
    </footer>
  );
}
