'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, BookOpen, Users, Award, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/videos/hero-bg.gif"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-indigo-900/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/image/logo.png"
            alt="Logo"
            width={220}
            height={88}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Öğrenciler İçin
          <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
            Not Paylaşım Platformu
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto text-gray-100">
          Binlerce öğrenci, milyonlarca ders notu.
        </p>

        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
              <Search className="ml-6 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Üniversite, ders veya konu ara..."
                className="w-full px-4 py-5 text-gray-900 focus:outline-none"
              />
              <button type="submit" className="mr-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold">
                Ara
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-4 justify-center mb-16">
          <Link href="/register" className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-bold">
            Ücretsiz Başla
          </Link>
          <Link href="#features" className="px-8 py-4 bg-white/10 text-white rounded-full font-bold">
            Nasıl Çalışır?
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Users, label: 'Aktif Öğrenci', value: '10.000+' },
            { icon: BookOpen, label: 'Ders Notu', value: '50.000+' },
            { icon: Award, label: 'Üniversite', value: '603' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-white" />
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
