"use client";
import { motion } from 'framer-motion';

export default function HakkimizdaClient() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">KARGANOT Hakkında</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          KARGANOT; öğrencilerin kaliteli ders notlarını kolayca paylaşabildiği ve emeklerinin karşılığını alabildiği
          modern bir öğrenme topluluğudur. Amacımız; bilgiye adil erişim ve dayanışma kültürü ile akademik başarıyı
          birlikte yükseltmektir.
        </p>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Misyon</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Bilgiyi paylaşan, emeğiyle kazanan bir öğrenci topluluğu oluşturmak; kalite standartları ve şeffaf
              süreçlerle sürdürülebilir bir paylaşım ağı kurmak.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Topluluk</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Öğrenci odaklı kararlar, geri bildirimlerle gelişen içerik, telif ve etik ilkelere saygı; herkes için daha
              iyi bir öğrenme deneyimi.
            </p>
          </div>
        </section>

        <blockquote className="mt-12 italic text-gray-800 dark:text-gray-200 border-l-4 border-gray-300 dark:border-gray-700 pl-4">
          “Bilgi paylaştıkça çoğalır.”
        </blockquote>
      </motion.div>
    </main>
  );
}
