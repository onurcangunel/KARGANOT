"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function IletisimClient() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 600));
    setStatus('sent');
    e.currentTarget.reset();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bize Ulaşın</h1>
        <p className="mt-3 text-gray-700">Her türlü soru, öneri ve geri bildirim için formu doldurabilir veya e-posta gönderebilirsiniz.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input name="name" required className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input type="email" name="email" required className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mesaj</label>
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500" />
          </div>
          <button disabled={status==='sending'} className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-white hover:bg-orange-700 disabled:opacity-50">
            {status==='sending' ? 'Gönderiliyor…' : 'Gönder'}
          </button>
          {status==='sent' && <p className="text-green-700">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>}
          {status==='error' && <p className="text-red-700">Bir hata oluştu. Lütfen tekrar deneyin.</p>}
        </form>

        <div className="mt-8 text-sm text-gray-700">
          E-posta: <a href="mailto:destek@karganot.com" className="text-orange-700 underline">destek@karganot.com</a>
          <div className="mt-3 flex items-center gap-3 text-gray-600">
            <a href="#" className="hover:text-gray-900">Instagram</a>
            <a href="#" className="hover:text-gray-900">Twitter</a>
            <a href="#" className="hover:text-gray-900">LinkedIn</a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
