'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, FileText, Search, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardContent() {
  const [question, setQuestion] = useState('');
  const [uploads] = useState([
    {
      id: 1,
      title: 'Biyoloji Ders Notları Giriş',
      type: 'PDF',
      date: '2 gün önce',
      views: 124,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: 'Matematik Problem Çözümleri',
      type: 'PDF',
      date: '5 gün önce',
      views: 89,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      title: 'Tarih Makale Taslağı',
      type: 'DOCX',
      date: '1 hafta önce',
      views: 45,
      color: 'from-green-400 to-green-600'
    }
  ]);

  const sampleQuestions = [
    { emoji: '🪐', text: 'Galaksimiz ne kadar büyük?', category: 'Astronomi' },
    { emoji: '🧬', text: 'Hücrenin önemli parçalarını açıkla', category: 'Biyoloji' },
    { emoji: '🔢', text: 'Bu ikinci dereceden denklemi çöz', category: 'Matematik' },
    { emoji: '📚', text: 'Fransız Devrimi\'ni özetle', category: 'Tarih' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hoş geldin, Kullanıcı! 👋
        </h1>
        <p className="text-gray-600">
          Bugün ne öğrenmek istersin?
        </p>
      </motion.div>

      {/* Sample Questions */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Örnek sorular:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleQuestions.map((q, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => console.log('Soru seçildi:', q.text)}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <span className="text-2xl">{q.emoji}</span>
              <div className="flex-1">
                <p className="text-gray-900 font-medium group-hover:text-orange-600 transition-colors">
                  {q.text}
                </p>
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  {q.category}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Your Uploads Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Yüklemelerin</h2>
          <button 
            onClick={() => console.log('Tümünü Gör')}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Tümünü Gör
          </button>
        </div>

        {uploads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploads.map((upload, index) => (
              <motion.div
                key={upload.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => console.log('Upload açıldı:', upload.title)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className={`h-32 bg-gradient-to-br ${upload.color} flex items-center justify-center`}>
                  <FileText className="w-12 h-12 text-white opacity-80" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {upload.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {upload.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {upload.views}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Henüz yükleme yok
            </h3>
            <p className="text-gray-600 mb-4">
              Toplulukla paylaşmak için çalışma materyallerini yüklemeye başla
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Belge Yükle tıklandı')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              Belge Yükle
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Footer Links */}
      <motion.div
        variants={itemVariants}
        className="mt-12 pt-8 border-t border-gray-200"
      >
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 justify-center">
          <a href="#" className="hover:text-orange-600 transition-colors">
            Topluluk Kuralları
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Telif Hakları Politikası
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Onur Kodu
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Gizlilik Politikası
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Hizmet Şartları
          </a>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          © 2025 KARGANOT. Tüm hakları saklıdır.
        </p>
      </motion.div>
    </motion.div>
  );
}
