'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ChevronDown,
  Edit2,
  Plus,
  Settings,
  Bell,
  Search,
  Home,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Brain,
  Library
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AccountSettingsPage() {
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [shareQuestions, setShareQuestions] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/image/logo.png" 
                alt="KARGANOT" 
                width={140} 
                height={56} 
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Ana Sayfa</span>
              </Link>
              <Link href="/ders-kaynaklari" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Ders Kaynakları</span>
              </Link>
              <Link href="/homework-help" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Ödev Yardımı</span>
              </Link>
              <Link href="/sinav-hazirlik" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Sınav Hazırlık</span>
              </Link>
              <Link href="/ai-chat" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI Asistan</span>
              </Link>
              <Link href="/library" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Library className="w-4 h-4" />
                <span className="text-sm font-medium">Kütüphane</span>
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold">
                Üyelik Yükselt
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white cursor-pointer hover:scale-105 transition-transform">
                O
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Page Title */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Hesap Ayarları
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Account Details Section */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Hesap detayları</h2>
            <p className="text-gray-600 mt-1">Kesintisiz erişim için hesap bilgilerinizi güncel tutun.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Email */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">E-posta adresi</label>
                <input 
                  type="email" 
                  defaultValue="onur@karganot.com"
                  className="w-full text-gray-900 bg-transparent border-0 focus:outline-none"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5 text-gray-400 hover:text-blue-600" />
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Şifre</label>
                <input 
                  type="password" 
                  defaultValue="••••••••"
                  className="w-full text-gray-900 bg-transparent border-0 focus:outline-none"
                  disabled
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5 text-gray-400 hover:text-blue-600" />
              </button>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon numarası</label>
                <p className="text-gray-500 text-sm">Henüz numara eklenmedi</p>
              </div>
              <Link href="#" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                <Plus className="w-4 h-4" />
                Numara ekle
              </Link>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900 mb-1 block">SMS Bildirimleri</label>
                <p className="text-gray-500 text-sm">Metin ile güncellemeler almak için aç/kapat</p>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Email Preferences Section */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">E-posta tercihleri</h2>
            <p className="text-gray-600 mt-1">KARGANOT'tan alacağınız e-postaları kontrol edin.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-700 font-medium mb-1">Almak istediğiniz mesaj türlerini seçin.</p>
                <p className="text-sm text-gray-500">İpuçları, teklifler ve KARGANOT'tan haberler</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Tercihleri yönet
              </Button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Not:</span> Hesap faaliyetiniz ve makbuzlar gibi hesapla ilgili e-postalar yine de gönderilebilir.
              </p>
            </div>
          </div>
        </section>

        {/* Question Sharing Settings */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Soru paylaşım ayarları</h2>
            <p className="text-gray-600 mt-1">Sohbette gönderdiğiniz sorular için paylaşım tercihlerini yönetin.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-4">
                <label className="text-gray-900 font-medium block mb-2">
                  KARGANOT'un sorularımı paylaşmasına izin ver
                </label>
                <p className="text-sm text-gray-600 leading-relaxed">
                  KARGANOT'un sohbette gönderdiğiniz soruları tespit etmesine ve diğer öğrencilere yardım etmek için KARGANOT Platformları kütüphanesine eklemesine izin verin.
                </p>
              </div>
              <button
                onClick={() => setShareQuestions(!shareQuestions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  shareQuestions ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    shareQuestions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Delete Account Section */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Hesabı sil</h2>
            <p className="text-gray-600 mt-1">Hesabınızı hemen sonlandırın.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Hesabı sil
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              <span className="font-semibold">Lütfen not:</span> Bu e-postayı gelecekte KARGANOT ile tekrar kullanamazsınız.
            </p>
          </div>
        </section>

        {/* Footer Character */}
        <div className="text-center py-12">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">👍</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            Herşey tamam. Burada değiştirecek başka bir şey yok.
          </p>
        </div>

      </main>
    </div>
  )
}
