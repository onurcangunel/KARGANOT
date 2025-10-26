'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Bell, ChevronDown, Upload, Image as ImageIcon, FileText, BookOpen, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { checkSession, getUser, logout, showNotification } from '@/lib/helpers'

export default function CourseHeroDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [aiQuestion, setAiQuestion] = useState('')

  useEffect(() => {
    if (!checkSession()) {
      router.push('/simple-login')
    } else {
      setUser(getUser())
    }
  }, [router])

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (aiQuestion.trim()) {
      showNotification('Sorunuz AI tarafından işleniyor...', 'info')
      setTimeout(() => {
        router.push('/ai-chat?q=' + encodeURIComponent(aiQuestion))
      }, 500)
    }
  }

  const handleLogout = () => {
    logout()
    showNotification('Başarıyla çıkış yaptınız', 'success')
    router.push('/simple-login')
  }

  const suggestedQuestions = [
    { emoji: '🪐', title: 'Galaksimiz ne kadar büyük?', category: 'Astronomi' },
    { emoji: '🧬', title: 'Bir hücrenin önemli kısımlarını açıklayın', category: 'Biyoloji' },
    { emoji: '🌳', title: 'Bitkilerde fotosentez sürecini açıklayın', category: 'Botanik' },
    { emoji: '🧮', title: 'Muhasebe öğrenmenin en iyi yolları nelerdir?', category: 'Muhasebe' }
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/home" className="flex items-center gap-2">
              <Image src="/image/logo.png" alt="KARGANOT" width={120} height={48} className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/home" className="text-gray-700 hover:text-blue-600 font-medium text-[15px]">Ana Sayfa</Link>
              <Link href="/documents" className="text-gray-700 hover:text-blue-600 font-medium text-[15px]">Belgeler</Link>
              <Link href="/qa" className="text-gray-700 hover:text-blue-600 font-medium text-[15px]">Soru & Cevap</Link>
              <Link href="/tutors" className="text-gray-700 hover:text-blue-600 font-medium text-[15px]">Özel Ders</Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/uyelik"><Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6">Yükselt</Button></Link>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">Profil</Link>
                  <Link href="/hesap-ayarlari" className="block px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">Ayarlar</Link>
                  <div className="border-t my-2"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-red-600">Çıkış Yap</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl border p-5 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500">Ücretsiz Üye</p>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/home" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm"><BookOpen className="w-4 h-4" /><span>Ana Sayfa</span></Link>
                <Link href="/belge-yukle" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm"><Upload className="w-4 h-4" /><span>Yüklemelerim</span></Link>
                <Link href="/homework-help" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm"><MessageSquare className="w-4 h-4" /><span>Ödev Yardımı</span></Link>
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-2xl mb-2">⭐</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Premium'a Geçin</h4>
                  <p className="text-xs text-gray-600 mb-3">Sınırsız erişim</p>
                  <Link href="/uyelik"><Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold py-2">Hemen Yükselt</Button></Link>
                </div>
              </div>
            </div>
          </aside>
          <main className="lg:col-span-9">
            <div className="bg-white rounded-xl border p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{new Date().getHours() < 12 ? 'Günaydın' : new Date().getHours() < 18 ? 'İyi günler' : 'İyi akşamlar'}</h1>
                  <p className="text-gray-600">Bugün ne öğrenmek istersiniz?</p>
                </div>
                <div className="hidden md:block text-6xl">📚</div>
              </div>
              <form onSubmit={handleAISubmit} className="bg-gray-50 rounded-xl p-6 border">
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2"><span className="text-blue-600">💡</span>AI'ya sorunuzu sorun. Kişisel bilgi girmeyin.</p>
                <textarea value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder="Sorunuzu buraya yazın..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-[15px] mb-4" rows={4} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button type="button" className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"><ImageIcon className="w-4 h-4" /><span>Resim ekle</span></button>
                    <Link href="/belge-yukle"><button type="button" className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"><FileText className="w-4 h-4" /><span>Belge yükle</span></button></Link>
                  </div>
                  <button type="submit" disabled={!aiQuestion.trim()} className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></button>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center"><Link href="/guidelines" className="text-blue-600 hover:underline">Topluluk Kuralları</Link>, <Link href="/copyright" className="text-blue-600 hover:underline">Telif Hakkı</Link> ve <Link href="/honor-code" className="text-blue-600 hover:underline">Onur Kodu</Link> geçerlidir</p>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {suggestedQuestions.map((q, i) => (
                <button key={i} onClick={() => setAiQuestion(q.title)} className="bg-white hover:bg-gray-50 border rounded-xl p-5 text-left hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{q.emoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600">{q.title}</p>
                      <p className="text-xs text-gray-500">{q.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Yüklemeleriniz</h2>
                <Link href="/belge-yukle" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Tümünü Gör →</Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-12 text-center border-2 border-dashed border-blue-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"><Upload className="w-8 h-8 text-blue-600" /></div>
                <div className="flex items-center justify-center gap-2 mb-3"><h3 className="text-lg font-bold text-gray-900">Çalıştığınız bir belge var mı?</h3><span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-bold rounded-full">YENİ</span></div>
                <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">Belgenizi AI destekli cevaplar, açıklamalar ve önerilerle zenginleştirin.</p>
                <Link href="/belge-yukle"><Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg"><Upload className="w-5 h-5 mr-2" />Belge Yükle</Button></Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
