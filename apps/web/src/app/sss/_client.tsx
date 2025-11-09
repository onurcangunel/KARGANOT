"use client";
import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'Not paylaşmak ücretsiz mi?', a: 'Evet. Not yüklemek tamamen ücretsizdir. KARGANOT yalnızca gerçekleşen satışlardan komisyon keser.' },
  { q: 'Satıştan ne kadar komisyon kesiliyor?', a: '%20 komisyon uygulanır. Gelirin %80’i içerik üreticisine aittir.' },
  { q: 'Kazançlar nasıl aktarılıyor?', a: 'Panelinizde biriken bakiyenizi 50₺ ve üzeri tutarlarda banka veya Papara hesabınıza aktarabilirsiniz.' },
  { q: 'Yüklediğim notlar onaylanmazsa ne olur?', a: 'Telif, kalite ve uygunluk kriterlerini karşılamayan notlar revizyon için geri bildirilir; gerekirse yayımlanmaz.' },
  { q: 'Hesabımı silebilir miyim?', a: 'Evet. Profil ayarlarından hesabınızı kalıcı olarak silebilirsiniz. İlgili mevzuat gereği finansal kayıtlar saklanabilir.' },
];

export default function SSSClient() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Sıkça Sorulan Sorular (SSS)</h1>
        <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {faqs.map((item, i) => (
            <div key={i} className="p-5">
              <button className="w-full text-left flex items-center justify-between" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-gray-500">{open === i ? '−' : '+'}</span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="mt-3 text-gray-700">{item.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
