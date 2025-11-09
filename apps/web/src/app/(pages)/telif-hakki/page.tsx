import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { motion } from 'framer-motion';

export const metadata: Metadata = buildMetadata({
  title: 'Telif Hakkı Bildirimi',
  description: 'Paylaşılan notların telif hakları yükleyiciye aittir; izinsiz çoğaltılamaz; ihlal durumunda hesap askıya alınır.',
  keywords: ['karganot', 'telif hakkı', 'bildirim', 'ihlal'],
  slug: '/telif-hakki',
});

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Telif Hakkı Bildirimi</h1>
        <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
          <p>KARGANOT’ta paylaşılan notların telif hakları aksi belirtilmedikçe yükleyiciye aittir. İçerikler izinsiz çoğaltılamaz, dağıtılamaz veya ticari amaçla kullanılamaz.</p>
          <p>Telif ihlali bildirimleriniz moderasyon ekibi tarafından hızla değerlendirilir; ihlalin tespitinde içerik kaldırılabilir ve ilgili hesap askıya alınabilir.</p>
        </div>
      </motion.div>
    </main>
  );
}
