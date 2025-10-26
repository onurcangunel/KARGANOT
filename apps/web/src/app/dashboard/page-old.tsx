'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  
  useEffect(() => {
    const user = localStorage.getItem('karganot_user')
    if (!user) {
      router.push('/simple-login')
    }
  }, [router])
  
  const sampleQuestions = [
    { text: 'Matematik nasıl öğrenilir?', emoji: '📐' },
    { text: 'Biyoloji hücre yapısı', emoji: '🧬' },
    { text: 'Tarih konu özetleri', emoji: '📜' },
    { text: 'Fizik formülleri', emoji: '⚛️' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      router.push(\`/ai-chat?q=\${encodeURIComponent(question)}\`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('karganot_user')
    router.push('/simple-login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">KARGANOT</h1>
            </div>
            <nav className="flex gap-4">
              <button onClick={() => router.push('/dashboard')} className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Ana Sayfa
              </button>
              <button onClick={() => router.push('/belge-yukle')} className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Belge Yükle
              </button>
              <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:text-red-700">
                Çıkış Yap
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 rounded-2xl p-12 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hoş geldiniz! 👋</h2>
            <p className="text-xl text-gray-700 mb-8">Ödevleriniz için AI destekli yardım alın</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Sorunuzu buraya yazın..." className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none" rows={4} />
              <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">Soru Sor 🚀</button>
            </form>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {sampleQuestions.map((q, i) => (
                <button key={i} onClick={() => setQuestion(q.text)} className="flex items-center gap-3 p-4 bg-white/90 rounded-xl hover:bg-white hover:shadow-lg transition-all text-left border border-gray-200">
                  <span className="text-2xl">{q.emoji}</span>
                  <span className="text-sm text-gray-700 font-medium flex-1">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yüklemeleriniz</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border-2 border-dashed border-blue-200">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belge Yükleyin</h3>
            <p className="text-gray-600 mb-4">PDF, Word veya Excel dosyalarınızı yükleyin</p>
            <button onClick={() => router.push('/belge-yukle')} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">📤 Yüklemeye Başla</button>
          </div>
        </div>
      </main>
    </div>
  )
}
