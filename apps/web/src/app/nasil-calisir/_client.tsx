"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Upload, BadgeCheck } from 'lucide-react';

const steps = [
  { icon: "📤", title: "Notunu yükle", desc: "Hazırladığın notu platforma ekle." },
  { icon: "💸", title: "Fiyatını belirle", desc: "Kendi emeğinin değerini sen seç." },
  { icon: "✅", title: "KARGANOT onaylasın", desc: "İçerik kalitesi ve telif kontrolü yapılır." },
  { icon: "🛒", title: "Diğer öğrenciler satın alsın", desc: "Notun arayan öğrencilere ulaşsın." },
  { icon: "🏦", title: "Kazancın hesabına yatsın", desc: "Gelirin güvenli şekilde hesabına aktarılır." },
];

export default function NasilCalisirClient() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#007aff]/10 via-white to-[#00d4ff]/10 dark:from-gray-950 dark:via-gray-950 dark:to-black px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 bg-gradient-to-r from-[#007aff] via-[#00d4ff] to-purple-500 bg-clip-text text-transparent">KARGANOT Nasıl Çalışır?</h1>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-7 flex flex-col items-center text-center border border-gray-100 dark:border-white/10"
            >
              <span className="text-4xl mb-3">{step.icon}</span>
              <h4 className="text-lg font-semibold mb-2 text-[#007aff] dark:text-[#00d4ff]">{step.title}</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
