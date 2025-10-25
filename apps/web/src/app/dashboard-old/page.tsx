'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, MessageSquare, Upload, HelpCircle, BookOpen, Home, Library, ArrowUpCircle, Lock, MessageCircleQuestion, Bell, ChevronDown, Image as ImageIcon, FileText, Send } from 'lucide-react'

export default function DashboardPage() {
  const [question, setQuestion] = useState('')

  const exampleQuestions = [
    { icon: '🌌', text: 'Evrenimiz ne kadar büyük?' },
    { icon: '🧬', text: 'Hücrenin önemli bölümlerini açıkla' },
    { icon: '🌱', text: 'Bitkilerde fotosentez sürecini açıkla' },
    { icon: '📊', text: 'Muhasebe öğrenmenin en iyi yolları neler?' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <Image 
              src="/karga-logo.png" 
              alt="Karga Logo" 
              width={40} 
              height={40}
              className="rounded-xl"
            />
            <div className="text-xl font-bold">
              <span className="text-[#FF6B00]">Karga</span>
            </div>
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-[#0066FF] rounded-lg mb-8 font-semibold">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          {/* Activity Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-4 px-4">Activity</h3>
            
            <Link href="/dashboard/questions" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
              <MessageCircleQuestion className="w-5 h-5" />
              <span>Your questions</span>
            </Link>

            <Link href="/dashboard/library" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
              <Library className="w-5 h-5" />
              <span>Library</span>
            </Link>

            <Link href="/dashboard/uploads" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
              <ArrowUpCircle className="w-5 h-5" />
              <span>Uploads</span>
            </Link>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-4 px-4">Account</h3>
            
            <div className="px-4 py-3 text-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <Lock className="w-5 h-5" />
                <span className="text-sm">0 unlocks</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">0 tutor questions</span>
              </div>
            </div>

            <button className="mt-4 mx-4 w-[calc(100%-2rem)] bg-[#0066FF] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-2">
              <span>Upgrade</span>
            </button>
          </div>

          {/* Q&A Badge */}
          <div className="mt-6 mx-4">
            <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Q&A</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search and extract content from course documents"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0066FF] focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0066FF] text-white p-2 rounded-lg">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Menu */}
              <div className="flex items-center space-x-6 ml-8">
                <Link href="/ai-chat" className="text-gray-700 hover:text-[#0066FF] font-medium">
                  AI Chat with PDF
                </Link>
                <Link href="/upload" className="text-gray-700 hover:text-[#0066FF] font-medium">
                  Upload for Unlocks
                </Link>
                <Link href="/expert" className="text-gray-700 hover:text-[#0066FF] font-medium">
                  Expert Help
                </Link>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-[#0066FF] font-medium">
                  <span>Study Resources</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="bg-blue-50 text-[#0066FF] px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
                  Ask AI
                </button>
                <button className="bg-[#0066FF] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Upgrade
                </button>
                <button className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </button>
                <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                  L
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Good Afternoon Section with Animated Character */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 mb-8 relative overflow-hidden">
            {/* Animated Karga Character - Right Side */}
            <div className="absolute right-0 top-0 w-80 h-80 pointer-events-none">
              <div className="relative w-full h-full animate-bounce-slow">
                <Image 
                  src="/karga-logo.png" 
                  alt="Karga Character" 
                  width={320}
                  height={320}
                  className="object-contain drop-shadow-2xl"
                />
                {/* Pen/Pencil Animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-wiggle">
                  <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                İyi günler
              </h1>

              {/* AI Question Box */}
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="AI'ya sorunuzu veya konunuzu sorun. Kişisel bilgi girmeyin."
                  className="w-full h-32 resize-none outline-none text-gray-700 text-lg"
                />

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-[#0066FF] hover:text-blue-700 font-medium">
                      <ImageIcon className="w-5 h-5" />
                      <span>Attach image</span>
                    </button>
                    <button className="flex items-center space-x-2 text-[#0066FF] hover:text-blue-700 font-medium">
                      <FileText className="w-5 h-5" />
                      <span>Upload doc</span>
                    </button>
                  </div>

                  <button className="bg-[#0066FF] text-white p-3 rounded-full hover:bg-blue-700 transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <Link href="#" className="underline">Community Guidelines</Link>, <Link href="#" className="underline">Copyright Policy</Link> & <Link href="#" className="underline">Honor Code</Link> apply.
                </div>
              </div>

              {/* Example Questions */}
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-4xl">
                {exampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="bg-white rounded-xl p-4 text-left hover:shadow-lg transition flex items-center space-x-3"
                  >
                    <span className="text-2xl">{q.icon}</span>
                    <span className="text-gray-700 font-medium">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Character Mascot */}
            <div className="absolute -right-12 -bottom-8 w-80 h-80 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-[#0066FF] to-[#FF6B00] rounded-full"></div>
            </div>
          </div>

          {/* Your Uploads Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your uploads</h2>
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">New</span>
            </div>

            <div className="text-center py-12">
              <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Henüz yükleme yapmadınız</p>
              <button className="bg-[#0066FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                İlk Notunuzu Yükleyin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}