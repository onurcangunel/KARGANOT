// KARGANOT Dashboard Rebuild - by Onur & Copilot
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  DollarSign,
  GraduationCap,
  Download,
  FileText,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/belgeler?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Notlarını Paylaş',
      description: 'Kendi notlarını yükle, diğer öğrencilere yardım et.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: DollarSign,
      title: 'Kazanç Sağla',
      description: 'Paylaştıkça kazan, emeğini değerlendir.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: GraduationCap,
      title: 'Bilgini Genişlet',
      description: 'Yeni ders notlarıyla sınavlara hazır ol.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const popularNotes = [
    {
      id: '1',
      title: 'Nesneye Dayalı Programlama - Vize Notu',
      university: 'İstanbul Teknik Üniversitesi',
      price: 15,
    },
    {
      id: '2',
      title: 'Veri Yapıları ve Algoritmalar - Final',
      university: 'Boğaziçi Üniversitesi',
      price: 20,
    },
    {
      id: '3',
      title: 'Lineer Cebir - Özet Notlar',
      university: 'ODTÜ',
      price: 12,
    },
    {
      id: '4',
      title: 'Fizik I - Hareket ve Kuvvet',
      university: 'Hacettepe Üniversitesi',
      price: 18,
    },
    {
      id: '5',
      title: 'Mikroekonomi - Final Soru Çözümleri',
      university: 'İstanbul Üniversitesi',
      price: 25,
    },
    {
      id: '6',
      title: 'Organik Kimya - Laboratuvar Raporu',
      university: 'Ege Üniversitesi',
      price: 10,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                KargaNot —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Öğrenciden Öğrenciye
                </span>{' '}
                Bilgi Platformu
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ders notlarını paylaş, kazanç sağla, bilgini genişlet.
              </p>

              {/* Search Bar - Enhanced */}
              <form onSubmit={handleSearch} className="mb-12">
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center">
                    <Search className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ders, konu veya okul ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 shadow-md hover:shadow-lg transition-all duration-200 text-gray-900 text-lg placeholder-gray-500 font-medium"
                  />
                </div>
              </form>

              {/* Feature Cards */}
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-orange-500"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Hero Visual - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative"
            >
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-none transform hover:scale-105 transition-transform duration-300">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/image/kargalar.png"
                >
                  <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Notes Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popüler Notlar ve Üniversiteler
            </h2>
            <p className="text-xl text-gray-600">En çok indirilen ders notlarına göz at</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200"
              >
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <FileText className="w-20 h-20 text-orange-600" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{note.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{note.university}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">₺{note.price}</span>
                    <Link
                      href={`/belgeler/${note.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Image src="/image/crow.svg" alt="crow" width={16} height={16} className="invert" />
                      <Download className="w-4 h-4" />
                      <span>İndir</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/belgeler"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Tüm Notları Gör
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// KARGANOT Dashboard Rebuild - by Onur & Copilot
