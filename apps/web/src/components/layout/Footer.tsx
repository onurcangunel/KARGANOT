export function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-6 pt-12 flex items-center gap-4">
        <img src="/image/logo.png" alt="KARGANOT" className="h-14 w-auto drop-shadow-sm" />
        <h3 className="text-2xl font-semibold tracking-tight">KARGANOT</h3>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div>
          <h4 className="text-base font-semibold mb-3">Hakkımızda</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="/hakkimizda" className="hover:text-white">Hakkımızda</a></li>
            <li><a href="/misyon" className="hover:text-white">Misyon</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-3">Ürün</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="/nasil-calisir" className="hover:text-white">Nasıl Çalışır</a></li>
            <li><a href="/ucretlendirme" className="hover:text-white">Ücretlendirme</a></li>
            <li><a href="/universiteler" className="hover:text-white">Üniversiteler</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-3">Yardım</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="/sss" className="hover:text-white">SSS</a></li>
            <li><a href="/iletisim" className="hover:text-white">İletişim</a></li>
            <li><a href="/destek-merkezi" className="hover:text-white">Destek Merkezi</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-3">Yasal</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="/gizlilik" className="hover:text-white">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="hover:text-white">Kullanım Şartları</a></li>
            <li><a href="/telif-hakki" className="hover:text-white">Telif Hakkı</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-white/60">
          © 2025 KARGANOT – Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  );
}
