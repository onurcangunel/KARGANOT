'use client';

import React from 'react';
import { Search, BookOpen, DollarSign, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Notlarını Paylaş',
      description: 'Ders notlarını topluluğa sun, bilgini yaygınlaştır'
    },
    {
      icon: DollarSign,
      title: 'Kazanç Sağla',
      description: 'Her paylaştığın not ile gelir elde et'
    },
    {
      icon: GraduationCap,
      title: 'Bilgini Genişlet',
      description: 'Binlerce öğrencinin notlarına erişim kazan'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-purple-50 py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              KargaNot – <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Öğrenciden Öğrenciye
              </span>
              <br />
              Bilgi Platformu
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Bilgini paylaş, kazancını artır. Türkiye'nin en akıllı öğrenci topluluğuna sen de katıl.
            </p>

            {/* Search Box */}
            <div className="relative mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ders, konu veya okul ara..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img
                  src="/image/kargalar.png"
                  alt="KargaNot Maskot"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Mascot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="lg:hidden mt-12 max-w-md mx-auto px-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
        >
          <img
            src="/image/kargalar.png"
            alt="KargaNot Maskot"
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// KARGANOT UI Update - by Onur & Copilot
