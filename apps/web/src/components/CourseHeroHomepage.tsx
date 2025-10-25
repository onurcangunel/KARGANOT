'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search, Upload, BookOpen, Users, GraduationCap, Award, ArrowRight, Star, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

// Türk Üniversiteleri - CourseHero'daki gibi
const TURKISH_UNIVERSITIES = [
  { name: 'İhsan Doğramacı Bilkent University', docs: '54K', questions: '628', slug: 'bilkent' },
  { name: 'Orta Doğu Teknik Üniversitesi', docs: '49K', questions: '1K', slug: 'odtu' },
  { name: 'Hacettepe Üniversitesi', docs: '19K', questions: '277', slug: 'hacettepe' },
  { name: 'İstanbul Teknik Üniversitesi', docs: '15K', questions: '412', slug: 'itu' },
  { name: 'Boğaziçi Üniversitesi', docs: '23K', questions: '589', slug: 'boun' },
  { name: 'Koç Üniversitesi', docs: '12K', questions: '198', slug: 'koc' },
]

// Son yüklenen dökümanlar
const RECENT_DOCUMENTS = [
  { id: 1, title: 'Week 10 Discussion 563.docx', university: 'Bilkent', course: 'CS101', preview: '/api/placeholder/400/500' },
  { id: 2, title: 'Fizik 101 Final Soruları.pdf', university: 'ODTÜ', course: 'PHYS101', preview: '/api/placeholder/400/500' },
  { id: 3, title: 'Makro İktisat Ders Notları.pdf', university: 'Hacettepe', course: 'ECON201', preview: '/api/placeholder/400/500' },
  { id: 4, title: 'Veri Yapıları Midterm.docx', university: 'İTÜ', course: 'BLG223', preview: '/api/placeholder/400/500' },
]

// Expert tutor soruları
const EXPERT_QUESTIONS = [
  { id: 1, subject: 'Matematik', question: 'İntegral hesaplama yöntemlerini karşılaştırın', solved: true },
  { id: 2, subject: 'Programlama', question: 'Dynamic String sınıfına metod ekleme', solved: true },
  { id: 3, subject: 'İstatistik', question: 'Regresyon analizi Excel data seti', solved: true },
]

export default function CourseHeroHomepage() {
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleGetMaterials = () => {
    if (selectedUniversity && selectedCourse) {
      window.location.href = `/search?university=${selectedUniversity}&course=${encodeURIComponent(selectedCourse)}`
    } else if (selectedUniversity) {
      window.location.href = `/university/${selectedUniversity}`
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* ==================== NAVIGATION ==================== */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/image/logo.png" alt="KARGA NOT" width={140} height={56} className="h-10 w-auto" priority />
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ders, üniversite veya döküman ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/resources" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Ders Kaynakları
              </Link>
              <Link href="/tutors" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Özel Ders
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Fiyatlandırma
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/login">Giriş Yap</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/register">Kaydol</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Dökümanını Yükle,
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Çalışmaya Başla
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <Sparkles className="inline w-5 h-5 text-yellow-500 mr-2" />
              AI destekli cevaplar, açıklamalar, öneriler, tek tıkla öğretmen yardımı ve daha fazlası
            </p>
          </div>

          {/* Upload Box - CourseHero Style */}
          <div className="max-w-2xl mx-auto">
            <Link href="/upload">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-primary transition-all cursor-pointer hover:shadow-2xl">
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Ders dökümanını yükle</h3>
                <p className="text-gray-600 mb-6">veya sorunuzu buraya yazın</p>
                
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg" asChild>
                  <span className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Dosya Yükle
                  </span>
                </Button>

                <p className="text-xs text-gray-500 mt-6 max-w-md mx-auto">
                  Dökümanın KARGANOT platformlarında paylaşılacak. En iyi sonuçlar için çok sorulu dökümanlar yükleyin
                  (Çoktan seçmeli, Boşluk doldurma, Açık uçlu sorular)
                </p>
              </div>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { icon: CheckCircle, text: 'Adım adım açıklamalar', color: 'text-green-600' },
              { icon: Star, text: 'Kişiselleştirilmiş öneriler', color: 'text-yellow-600' },
              { icon: Users, text: 'Uzman öğretmenlerden yardım', color: 'text-purple-600' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <span className="font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STUDY SEAMLESSLY ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Kesintisiz Çalış
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                İhtiyacın olan tüm kaynakları kendi dökümanında bul
              </p>
              <ul className="space-y-4 mb-8">
                {['Adım adım açıklamalar', 'Öneriler', 'Uzman öğretmenlerden yardım'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-primary" asChild>
                <Link href="/ai-chat">
                  Daha Fazla Bilgi <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-96 border-2 border-dashed border-gray-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Sparkles className="w-20 h-20 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">PDF'inle Sohbet Et</h3>
                <p className="text-gray-600 mb-6">AI destekli anında cevaplar ve açıklamalar</p>
                <Button className="bg-primary" asChild>
                  <Link href="/upload">Şimdi Dene</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== UNIVERSITIES ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Okulundaki Ders Materyallerini Bul
            </h2>
            <p className="text-xl text-gray-600">
              Yakınındaki En İyi Üniversiteler*
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TURKISH_UNIVERSITIES.map((uni, i) => (
              <Link
                key={i}
                href={`/university/${uni.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-200 hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {uni.name.substring(0, 1)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{uni.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span><BookOpen className="inline w-4 h-4 mr-1" />{uni.docs} Döküman</span>
                      <span><Users className="inline w-4 h-4 mr-1" />{uni.questions} Soru</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            *KARGA NOT hiçbir kolej veya üniversite tarafından desteklenmemektedir.
          </p>
        </div>
      </section>

      {/* ==================== RECENT DOCUMENTS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              En Parlak Öğrencilerden En İyilerini Gör
            </h2>
            <p className="text-xl text-gray-600">
              Diğer öğrenciler tarafından yakın zamanda yüklenen dökümanları keşfet
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {RECENT_DOCUMENTS.map((doc) => (
              <Link
                key={doc.id}
                href={`/file/${doc.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary">
                    {doc.title}
                  </p>
                  <p className="text-sm text-gray-600">{doc.university} · {doc.course}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPERT TUTORS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uzman Öğretmenlerden Yardım Al, 7/24
            </h2>
            <p className="text-xl text-gray-600">
              Öğrenciler tarafından yakın zamanda sorulan ve doğrulanmış uzmanlar tarafından çözülen soruları keşfet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {EXPERT_QUESTIONS.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {q.subject}
                  </span>
                  {q.solved && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <p className="text-gray-900 font-medium mb-4">{q.question}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Çözümü Gör <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COURSE SELECTOR ==================== */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Okulundaki Ders Materyallerini Bul
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <span className="text-lg">Ben</span>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium min-w-[250px]"
              >
                <option value="">Üniversite seç</option>
                {TURKISH_UNIVERSITIES.map((uni, i) => (
                  <option key={i} value={uni.slug}>{uni.name}</option>
                ))}
              </select>
              <span className="text-lg">öğrencisiyim ve dersim</span>
              <input
                type="text"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                placeholder="Ders adı"
                className="px-6 py-3 rounded-lg bg-white text-gray-900 min-w-[200px]"
              />
            </div>
            <Button 
              size="lg" 
              className="mt-6 bg-secondary hover:bg-secondary/90 text-gray-900"
              onClick={handleGetMaterials}
              disabled={!selectedUniversity}
            >
              Ders Materyallerini Getir
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== AI TOOLS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              KARGA NOT'un AI'ı ile Yardım Al
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'AI Chat with PDF', icon: Sparkles, color: 'from-blue-500 to-cyan-500', href: '/ai-chat' },
              { name: 'Dilbilgisi Kontrolü', icon: CheckCircle, color: 'from-green-500 to-emerald-500', href: '/tools/grammar' },
              { name: 'Parafraz', icon: BookOpen, color: 'from-purple-500 to-pink-500', href: '/tools/paraphraser' },
              { name: 'İmla Kontrolü', icon: Award, color: 'from-orange-500 to-red-500', href: '/tools/spell-checker' },
            ].map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-200 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary">{tool.name}</h3>
                <span className="text-primary text-sm flex items-center justify-center">
                  Dene <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">Şirket</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">Hakkımızda</Link></li>
                <li><Link href="/careers" className="hover:text-white">Kariyer</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>

            {/* Study Tools */}
            <div>
              <h4 className="font-bold text-white mb-4">Çalışma Araçları</h4>
              <ul className="space-y-2">
                <li><Link href="/ai-chat" className="hover:text-white">AI Chat</Link></li>
                <li><Link href="/grammar" className="hover:text-white">Dilbilgisi</Link></li>
                <li><Link href="/paraphraser" className="hover:text-white">Parafraz</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold text-white mb-4">Yardım</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-white">İletişim</Link></li>
                <li><Link href="/faq" className="hover:text-white">SSS</Link></li>
                <li><Link href="/feedback" className="hover:text-white">Geri Bildirim</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4">Yasal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:text-white">Kullanım Koşulları</Link></li>
                <li><Link href="/copyright" className="hover:text-white">Telif Hakkı</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-white mb-4">Bizi Takip Edin</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                <li><Link href="#" className="hover:text-white">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white">Instagram</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">
              © 2025 KARGA NOT. Tüm hakları saklıdır. KARGA NOT hiçbir kolej veya üniversite tarafından desteklenmemektedir.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
