"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const DUMMY_UNIS = [
  'İstanbul Üniversitesi',
  'Ankara Üniversitesi',
  'Hacettepe Üniversitesi',
  'Ege Üniversitesi',
  'Boğaziçi Üniversitesi',
  'Orta Doğu Teknik Üniversitesi (ODTÜ)',
  'İstanbul Teknik Üniversitesi (İTÜ)',
  'Marmara Üniversitesi',
  'Dokuz Eylül Üniversitesi',
  'Yıldız Teknik Üniversitesi',
];

export default function UniversitiesClient() {
  const [q, setQ] = React.useState('');
  const list = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    return DUMMY_UNIS.filter((u) => u.toLowerCase().includes(t));
  }, [q]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Üniversiteler</h1>
        <p className="mt-3 text-lg text-gray-700">KARGANOT, Türkiye genelinde 208 üniversiteyi kapsayan bir paylaşım ağı hedefler. Aşağıdan üniversiteni arayabilirsin.</p>

        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Üniversite ara" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"/>
        </div>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {list.map((u) => (
            <li key={u} className="rounded-lg border border-gray-200 bg-white p-4 text-gray-900">{u}</li>
          ))}
          {list.length === 0 && (
            <li className="text-gray-600 text-sm">Sonuç bulunamadı.</li>
          )}
        </ul>
      </motion.div>
    </main>
  );
}
