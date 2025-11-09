// KARGANOT Homepage – Lux redesign
'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UploadCloud, BookOpen, Wallet } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, -40]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <>
      {/* Hero */}
  <section className="relative overflow-hidden pt-20 pb-24">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ y: y1, opacity: opacityHero }}
        >
          <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-white/50 to-white/10 dark:from-white/10 dark:to-white/0 blur-3xl" />
          <div className="absolute -bottom-40 left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-neutral-200/60 to-neutral-50/20 dark:from-neutral-800/40 dark:to-neutral-900/20 blur-3xl" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Notunu paylaş, kazancını artır.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
              Öğrenciler için premium bir paylaşım deneyimi. Beyaz-gri sakinliğinde, mavi bir dokunuşla.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#007aff] px-6 py-3 text-white shadow-md transition hover:shadow-lg active:scale-[0.98]"
              >
                <UploadCloud size={18} /> Hemen Başla
              </Link>
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-6 py-3 text-neutral-700 dark:text-neutral-200 bg-white/60 dark:bg-white/5 backdrop-blur hover:bg-white/80 dark:hover:bg-white/10 transition relative overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="shimmer-line block h-full w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80 group-hover:opacity-100"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
                Demo izle
              </Link>
            </div>
          </motion.div>

          {/* Feature glass cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Not Yükle', Icon: UploadCloud, desc: 'PDF veya görsel notlarını yükle.' },
              { title: 'Not Satın Al', Icon: BookOpen, desc: 'Binlerce not arasından seç, indir.' },
              { title: 'Kazanç Takip Et', Icon: Wallet, desc: 'Satışlarını ve gelirini anlık izle.' },
            ].map((f, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-11 w-11 rounded-xl bg-gradient-to-br from-white/70 to-white/30 dark:from-white/10 dark:to-white/5 flex items-center justify-center shadow-inner">
                    <f.Icon className="h-5 w-5 text-[#007aff]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{f.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder further sections can follow here */}
    </>
  );
}
