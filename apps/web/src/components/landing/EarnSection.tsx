'use client';

import React from 'react';
import { TrendingUp, Coins, Upload, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EarnSection() {
  const earningsTable = [
    { notes: 10, price: 10, commission: 30, earning: 70 },
    { notes: 25, price: 10, commission: 30, earning: 175 },
    { notes: 50, price: 15, commission: 30, earning: 525 },
    { notes: 100, price: 15, commission: 30, earning: 1050 },
    { notes: 200, price: 20, commission: 30, earning: 2800 }
  ];

  const steps = [
    {
      icon: Upload,
      title: 'Notunu Yükle',
      description: 'Kaliteli ders notlarını platformumuza yükle'
    },
    {
      icon: Coins,
      title: 'Fiyatını Belirle',
      description: 'Notunun değerini sen belirle'
    },
    {
      icon: TrendingUp,
      title: 'Kazanmaya Başla',
      description: 'Her satıştan anında kazanç elde et'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
            <Zap className="w-4 h-4" />
            Kazanç Sistemi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Paylaş Kazan 💰
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ders notlarını yükle, fiyatını belirle. Her satıştan kazanç elde et, başarıya kanat çırp.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-orange-300 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Earnings Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Kazanç Hesaplama Tablosu
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Satılan Not Sayısı</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Fiyat</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Komisyon</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-orange-600">Kazancın</th>
                </tr>
              </thead>
              <tbody>
                {earningsTable.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.notes}</td>
                    <td className="px-6 py-4 text-gray-700">{row.price}₺</td>
                    <td className="px-6 py-4 text-gray-700">%{row.commission}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-lg">
                        <Coins className="w-5 h-5" />
                        {row.earning}₺
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-8 py-6 border-t border-gray-200">
            <p className="text-center text-gray-700 font-medium leading-relaxed">
              <span className="text-orange-600 font-bold">KargaNot'ta kazanç elde etmek çok kolay.</span>
              <br />
              Yükle, paylaş, kazan!
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Hemen Başla
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// KARGANOT UI Update - by Onur & Copilot
