import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { motion } from 'framer-motion';

export const metadata: Metadata = buildMetadata({
  title: 'Gizlilik Politikası',
  description: 'Kişisel veriler KVKK’ya uygun işlenir; ödeme güvenliği Iyzico ile sağlanır; veriler üçüncü taraflarla paylaşılmaz.',
  keywords: ['karganot', 'gizlilik politikası', 'kvkk', 'iyzico', 'veri güvenliği'],
  slug: '/gizlilik-politikasi',
});

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Gizlilik Politikası</h1>
        <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
          <p>
            KARGANOT, kullanıcıların kişisel verilerini 6698 sayılı KVKK ve ilgili mevzuata uygun şekilde işler. Toplanan
            veriler; hesap yönetimi, içerik moderasyonu, güvenli ödeme süreçleri ve kullanıcı deneyiminin iyileştirilmesi
            amaçlarıyla sınırlıdır.
          </p>
          <p>
            Ödeme işlemleri Iyzico altyapısıyla gerçekleştirilir. Kart bilgileriniz KARGANOT sistemlerinde tutulmaz ve
            yalnızca ödeme hizmet sağlayıcısınca işlenir. Güvenlik için sektör standartlarında şifreleme ve erişim
            kontrol mekanizmaları uygulanır.
          </p>
          <p>
            Kişisel verileriniz açık rızanız veya yasal yükümlülükler haricinde üçüncü taraflarla paylaşılmaz. Haklarınız
            kapsamında veri erişimi, düzeltme, silme ve itiraz taleplerinizi iletebilirsiniz.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
