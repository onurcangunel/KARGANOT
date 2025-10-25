'use client'

import { motion } from 'framer-motion'
import { Upload, Users, BookOpen, Award, TrendingUp, MessageSquare, Search, Download } from 'lucide-react'
import Link from 'next/link'

/**
 * 🎨 ÖZELLİKLER SEKSİYONU (COURSEHERO TARZI)
 * 
 * - 8 Ana Özellik
 * - Hover animasyonları
 * - Icon'lar
 * - CTA butonları
 */

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  link: string
  color: string
  bgGradient: string
}

const features: Feature[] = [
  {
    icon: Upload,
    title: 'Not Yükle & Kazan',
    description: 'Ders notlarını yükle, kredi kazan ve başka notlara erişim sağla.',
    link: '/upload',
    color: 'text-orange-600',
    bgGradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Search,
    title: '30M+ Doküman Ara',
    description: '603 üniversite, binlerce ders için hazır notlar.',
    link: '/search',
    color: 'text-blue-600',
    bgGradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: MessageSquare,
    title: 'Soru Sor & Cevap Al',
    description: '7/24 öğretmen desteği ile anlık yardım al.',
    link: '/qa',
    color: 'text-purple-600',
    bgGradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: BookOpen,
    title: 'Kitap Çözümleri',
    description: 'ISBN ile ders kitabı çözümlerini bul.',
    link: '/textbooks',
    color: 'text-green-600',
    bgGradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: TrendingUp,
    title: 'AI Çalışma Asistanı',
    description: 'Yapay zeka ile kişisel çalışma planı oluştur.',
    link: '/ai-assistant',
    color: 'text-cyan-600',
    bgGradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Users,
    title: 'Çalışma Grupları',
    description: 'Arkadaşlarınla birlikte çalış, bilgi paylaş.',
    link: '/groups',
    color: 'text-pink-600',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Award,
    title: 'Rozetler & Liderlik',
    description: 'Puan kazan, rozetler topla, lider tablosunda yüksel.',
    link: '/leaderboard',
    color: 'text-yellow-600',
    bgGradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Download,
    title: 'Offline Erişim',
    description: 'İndir, internetsiz çalış. Mobil uygulamada tüm özellikler.',
    link: '/mobile',
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-500 to-purple-500'
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Başlık */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Başarı İçin <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Her Şey Burada</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CourseHero'nun tüm özelliklerini Türkiye'ye getirdik. 
            Sınavlara hazırlanmak hiç bu kadar kolay olmamıştı!
          </p>
        </motion.div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.link}>
                <div className="group relative h-full bg-white rounded-2xl p-6 
                              border-2 border-gray-100 hover:border-transparent
                              hover:shadow-2xl transition-all duration-300
                              cursor-pointer overflow-hidden">
                  
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} 
                                opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgGradient}
                                flex items-center justify-center mb-4
                                group-hover:scale-110 transition-transform duration-300
                                shadow-lg group-hover:shadow-xl`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="relative mt-4 flex items-center text-sm font-semibold text-gray-400 
                                group-hover:text-blue-600 transition-colors">
                    <span>Keşfet</span>
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.bgGradient} 
                                rounded-2xl blur opacity-0 group-hover:opacity-30 
                                transition-opacity duration-300 -z-10`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white rounded-full font-bold text-lg
                     hover:from-blue-700 hover:to-purple-700
                     shadow-xl hover:shadow-2xl
                     transform hover:scale-105 transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            Hemen Ücretsiz Başla
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Kredi kartı gerekmez • 10 kredi hediye • İstediğin zaman iptal et
          </p>
        </motion.div>

      </div>
    </section>
  )
}
