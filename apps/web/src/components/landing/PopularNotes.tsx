'use client';

import React from 'react';
import { Download, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PopularNotes() {
  const notes = [
    {
      id: 1,
      title: 'Fizik 101 Ders Özeti',
      university: 'İTÜ',
      rating: 4.8,
      downloads: 1234,
      price: 10,
      image: '/image/logo.png',
      category: 'Fizik'
    },
    {
      id: 2,
      title: 'Kalkülüs I Final Notları',
      university: 'ODTÜ',
      rating: 4.9,
      downloads: 2156,
      price: 15,
      image: '/image/logo.png',
      category: 'Matematik'
    },
    {
      id: 3,
      title: 'Organik Kimya Özet',
      university: 'Boğaziçi',
      rating: 4.7,
      downloads: 892,
      price: 12,
      image: '/image/logo.png',
      category: 'Kimya'
    },
    {
      id: 4,
      title: 'Veri Yapıları ve Algoritmalar',
      university: 'Bilkent',
      rating: 5.0,
      downloads: 3421,
      price: 20,
      image: '/image/logo.png',
      category: 'Bilgisayar'
    },
    {
      id: 5,
      title: 'İngilizce Gramer Notları',
      university: 'Hacettepe',
      rating: 4.6,
      downloads: 1567,
      price: 8,
      image: '/image/logo.png',
      category: 'Dil'
    },
    {
      id: 6,
      title: 'Makroekonomi Ders Notları',
      university: 'İstanbul Üniversitesi',
      rating: 4.8,
      downloads: 1098,
      price: 18,
      image: '/image/logo.png',
      category: 'Ekonomi'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popüler Notlar ve Üniversiteler
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En çok indirilen ve beğenilen ders notlarına göz atın
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
            >
              {/* Image Preview */}
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-32 h-32 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {note.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {note.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">{note.university}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{note.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{note.downloads.toLocaleString()}</span>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-orange-600">
                    ₺{note.price}
                  </div>
                    <button className="px-5 py-2.5 rounded-full btn-premium font-medium transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                    İndir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105">
            Tüm Notları Görüntüle
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// KARGANOT UI Update - by Onur & Copilot
