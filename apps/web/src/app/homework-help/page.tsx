'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Upload,
  ImageIcon,
  CheckCircle,
  MessageCircle,
  Brain,
  BookOpen,
  Home,
  HelpCircle,
  GraduationCap,
  Library,
  Bell,
  Clock,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomeworkHelpPage() {
  const [question, setQuestion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('En Popüler')

  const categories = [
    'En Popüler',
    'Matematik',
    'Muhasebe ve İşletme',
    'Doğa Bilimleri',
    'Bilgisayar ve Mühendislik',
    'Sosyal Bilimler',
    'Edebiyat ve Dil',
    'Tarih'
  ]

  const subjects = [
    'Matematik', 'Muhasebe', 'Biyoloji', 'İşletme', 'Kimya', 
    'Bilgisayar Bilimleri', 'Ekonomi', 'İngilizce', 'Finans', 'Yönetim',
    'Fizik', 'Psikoloji', 'Sosyoloji', 'Zooloji'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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

            <nav className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Ana Sayfa</span>
              </Link>
              <Link href="/ders-kaynaklari" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Ders Kaynakları</span>
              </Link>
              <Link href="/homework-help" className="flex items-center gap-2 text-blue-600 font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Ödev Yardımı</span>
              </Link>
              <Link href="/sinav-hazirlik" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Sınav Hazırlık</span>
              </Link>
              <Link href="/ai-chat" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI Asistan</span>
              </Link>
            </nav>

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Size özel ödev yardımı</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-xl">Doğrulanmış uzman eğitmenle 7/24 bağlantı kurun</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xl">30 dakikada cevap ve açıklama alın</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Question Form */}
      <section className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Soru sor</h2>
          
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Sorunuzu yazın veya buraya resim ekleyin..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
            />
            
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Resim Ekle
              </Button>
              
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8">
                Soru Gönder
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Adım adım çözümleri keşfedin:</h2>
        
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Example Question Card */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  19 dakikada yanıtlandı
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Finansal Muhasebe
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Örnek Soru: Sunland Mühendislik Hizmetleri François Sunland'a aittir. Aşağıdaki seçilmiş hesaplar...
              </h3>
              
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Cevap:</span> Ayrıntılı cevap için aşağıdaki açıklamaya bakın.
              </p>
              
              <Button variant="link" className="text-blue-600 hover:text-blue-700 font-semibold p-0">
                Tam çözümü gör →
              </Button>
            </div>

            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">4.9</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Nasıl Çalışır</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Soru sorun</h3>
              <p className="text-gray-600">
                Ödev sorunuzu yazın veya fotoğraf ekleyin. Hangi konuda yardım istediğinizi belirtin.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Uzmanla bağlanın</h3>
              <p className="text-gray-600">
                Sorunuz alanında uzman bir eğitmene iletilir. 30 dakika içinde yanıt alın.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Öğrenmeye başlayın</h3>
              <p className="text-gray-600">
                Adım adım açıklamalarla konuyu tam olarak anlayın. Tekrar soru sorabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Experts */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Operasyonun beyinleriyle tanışın</h2>
          <p className="text-xl text-gray-600 mb-8">
            Her cevap alanında özel eğitim almış doğrulanmış uzmandan gelir
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg hover:scale-110 transition-transform"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg">
            Uzmanlarımızı Keşfedin
          </Button>
        </div>
      </section>

      {/* Subject List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Muhasebedan Zoolojiye çalışma yardımı
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Her konuda uzman eğitmenlerimizden yardım alın
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject}
                href={`/subjects/${subject.toLowerCase()}`}
                className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {subject}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ödevlerinizde yalnız değilsiniz!</h2>
          <p className="text-xl mb-8">Hemen sorunuzu sorun ve uzman yardımı alın</p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
            Şimdi Soru Sor
          </Button>
        </div>
      </section>

    </div>
  )
}
