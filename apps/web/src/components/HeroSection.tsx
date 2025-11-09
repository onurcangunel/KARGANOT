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
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 via-purple-950/60 to-indigo-950/70"></div>
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
          <span className="block mt-2 gradient-text-lux">
            Not Paylaşım Platformu
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto text-gray-100/90">
          Paylaş, keşfet ve başarıya odaklan. Notlarını güvenle yükle, dilediğin ders notunu kolayca bul.
        </p>

        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex items-center glass subtle-border rounded-full shadow-2xl overflow-hidden backdrop-blur-xl">
              <Search className="ml-6 w-6 h-6 text-white/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Üniversite, ders veya konu ara..."
                className="w-full px-4 py-5 bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
              <button type="submit" className="mr-2 btn-premium rounded-full">
                Ara
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-4 justify-center mb-16">
          <Link href="/register" className="btn-premium rounded-full">
            Ücretsiz Başla
          </Link>
          <Link href="#features" className="btn-ghost-premium rounded-full">
            Nasıl Çalışır?
          </Link>
        </div>

  {/* İstatistik kartları geçici olarak kaldırıldı */}
      </div>
    </section>
  )
}
