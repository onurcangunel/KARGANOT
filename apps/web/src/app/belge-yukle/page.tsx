'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Upload,
  FileText,
  Search,
  Check,
  X,
  ChevronDown,
  Home,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Brain,
  Library,
  Bell,
  Sparkles,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { validateFile, showNotification } from '@/lib/helpers'

export default function UploadPage() {
  const [selectedSchool, setSelectedSchool] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('Güz 2025')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    const maxSize = 50 * 1024 * 1024 // 50MB

    if (!validateFile(file, allowedTypes, maxSize)) {
      showNotification('Geçersiz dosya. PDF, DOC, DOCX veya XLSX formatında ve maksimum 50MB boyutunda olmalı.', 'error')
      return
    }

    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)
    
    showNotification('Dosya yükleniyor...', 'info')

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          showNotification(`${file.name} başarıyla yüklendi! 🎉`, 'success')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    
    if (file) {
      // Create a mock event to use existing upload handler
      const mockEvent = {
        target: { files: [file] }
      } as any
      await handleFileUpload(mockEvent)
    }
  }

  const exampleDocuments = [
    { title: 'Deneme Sınavı', course: 'Matematik 1001', week: '5. Hafta', pages: 7 },
    { title: 'Ders Notları', course: 'Fizik 201', week: '3. Hafta', pages: 12 },
    { title: 'Soru Bankası', course: 'Kimya 101', week: '8. Hafta', pages: 5 },
    { title: 'Proje Ödevi', course: 'Bilgisayar 301', week: '10. Hafta', pages: 15 },
  ]

  const acceptedFormats = [
    { name: 'PDF', icon: '📄', color: 'from-red-400 to-red-600' },
    { name: 'DOC', icon: '📝', color: 'from-blue-400 to-blue-600' },
    { name: 'DOCX', icon: '📘', color: 'from-blue-500 to-blue-700' },
    { name: 'XLSX', icon: '📊', color: 'from-green-400 to-green-600' },
  ]

  const benefits = [
    {
      icon: <Check className="w-6 h-6" />,
      title: 'Adım adım açıklamalar',
      description: 'AI destekli detaylı açıklamalar alın'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Öneriler',
      description: 'Konuyla ilgili akıllı öneriler'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '100 milyon+ belgeye erişim',
      description: 'Zengin kütüphanemizden yararlanın'
    },
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
              <Link href="/homework-help" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Ödev Yardımı</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-2 text-blue-600 font-semibold">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Belge Yükle</span>
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
            <h1 className="text-5xl font-bold mb-4">Yükleyerek açma kredisi kazan</h1>
            <p className="text-xl mb-6">10 adet kendi belgenizi yükleyerek 5 açma kredisi kazanın</p>
            <p className="text-lg opacity-90">200 milyondan fazla çalışma kaynağına erişin</p>
            
            {/* Progress Bar */}
            <div className="mt-8 bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="mt-2 text-sm">5 açma kredisi kazanmak için 10 belge kaldı</p>
          </div>
        </div>
      </section>

      {/* Course Add Form */}
      <section className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Belge eklemeye başlamak için kurs ekleyin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* School Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Okul / Üniversite
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Okulunuzu veya üniversitenizi bulun"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Course Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kurs
              </label>
              <input
                type="text"
                placeholder="Kurs adı veya kurs kodu yazın"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Period Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Akademik Dönem
              </label>
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option>Güz 2025</option>
                  <option>Bahar 2025</option>
                  <option>Yaz 2025</option>
                  <option>Güz 2024</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8">
            Kurs Ekle
          </Button>
        </div>
      </section>

      {/* Easy to Share */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Paylaşmak kolay</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {exampleDocuments.map((doc, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <FileText className="w-16 h-16 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {doc.pages} sayfa
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
              <p className="text-sm text-gray-600">{doc.course}</p>
              <p className="text-xs text-gray-500">{doc.week}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accepted Formats */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-sm border border-gray-200 mx-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kabul Edilen Formatlar</h2>
        
        <div className="flex justify-center gap-6 mb-8">
          {acceptedFormats.map((format, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${format.color} rounded-xl flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform`}>
                <span className="text-4xl">{format.icon}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">{format.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mb-6">
          Kabul edilen formatlar: <span className="font-semibold">pdf, doc, docx, xls, xlsx</span>
        </p>

        {/* Drag & Drop Upload Area */}
        <div 
          className="max-w-2xl mx-auto border-2 border-dashed border-blue-300 rounded-xl p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-500 transition-colors relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Dosyaları buraya sürükleyin</h3>
          <p className="text-gray-600 mb-6">veya bilgisayarınızdan seçin</p>
          
          <label htmlFor="file-upload">
            <Button 
              className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-6 text-lg cursor-pointer ${isUploading ? 'loading opacity-75' : ''}`}
              disabled={isUploading}
              asChild
            >
              <span>{isUploading ? 'Yükleniyor...' : 'Dosya Seç'}</span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}% tamamlandı</p>
            </div>
          )}

          {/* Uploaded File Info */}
          {uploadedFile && !isUploading && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => setUploadedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Gizliliğiniz önemli</h3>
              <p className="text-gray-700 mb-4">
                Belgeler otomatik oluşturulan kullanıcı adlarıyla paylaşılır. Kaldırmayı unutmayın:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700 font-medium">Adınız</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700 font-medium">Öğrenci numaranız</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700 font-medium">E-posta adresiniz</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Daha fazla bilgi için{' '}
                <Link href="/faq" className="text-blue-600 hover:underline font-semibold">SSS</Link>
                {' '}ve{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline font-semibold">Gizlilik Politikamızı</Link>
                {' '}inceleyin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Belge açtığımda ne olur?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Yüklediğiniz belgeleri AI ile zenginleştirin
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* AI Access Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-2">AI ve eğitmen yanıtlarına erişim</h3>
          <p className="text-lg opacity-90 mb-6">
            Belgelerinizi yükleyin, AI destekli açıklamalar ve uzman cevaplarıyla öğrenin
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
            Hemen Başla
          </Button>
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bilgi paylaşım topluluğunun parçası olun
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Bu hafta öğrenciler ve doğrulanmış eğitmenler{' '}
            <span className="font-bold text-blue-600">324.356 belge</span> yükledi
          </p>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { name: 'Ayşe K.', text: 'KARGANOT sayesinde notlarımı paylaşıp diğer öğrencilere yardımcı oldum!', avatar: 'A' },
              { name: 'Mehmet Y.', text: 'Yüklediğim belgeler için kredi kazandım ve kütüphaneye erişim sağladım.', avatar: 'M' },
              { name: 'Zeynep T.', text: 'AI açıklamaları sayesinde konuları daha iyi anladım.', avatar: 'Z' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-left">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
