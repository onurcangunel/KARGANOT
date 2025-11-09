import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { motion } from 'framer-motion';

export const metadata: Metadata = buildMetadata({
  title: 'Destek Merkezi',
  description: 'SSS, rehber içerikler ve iletişim: ihtiyacın olan yardıma hızlıca ulaş.',
  keywords: ['karganot', 'destek', 'yardım', 'rehber', 'sss'],
  slug: '/destek-merkezi',
});

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Destek Merkezi</h1>
        <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
          <p>Yanıt aradığın konu mu var? İşte hızlı bağlantılar:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><a className="text-orange-700 underline" href="/sss">Sıkça Sorulan Sorular</a></li>
            <li><a className="text-orange-700 underline" href="/nasil-calisir">Nasıl Çalışır Rehberi</a></li>
            <li><a className="text-orange-700 underline" href="/iletisim">İletişim Formu</a></li>
          </ul>
        </div>
      </motion.div>
    </main>
  );
}
