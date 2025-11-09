import React from 'react';

export const metadata = {
  title: 'Demo | KARGANOT',
  description: 'KARGANOT ürün demosunu izleyin.',
};

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">Ürün Demosu</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">Kısa bir tanıtım videosu ile deneyimi keşfedin.</p>
      <div className="mt-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <video className="w-full aspect-video" src="/videos/hero-bg.mp4" controls playsInline poster="/image/logo.png" />
      </div>
    </main>
  );
}
