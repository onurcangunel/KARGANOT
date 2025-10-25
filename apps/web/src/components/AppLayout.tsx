'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  Award,
  LogOut,
  Home,
  HelpCircle,
  BookOpen,
  Upload,
  Lock,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export default function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('karganot_user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if not authenticated
      if (pathname !== '/login' && pathname !== '/register' && pathname !== '/') {
        router.push('/login')
      }
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('karganot_user')
    router.push('/login')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <Image 
              src="/image/logo.png" 
              alt="KARGANOT" 
              width={140} 
              height={56} 
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ders dokümanından içerik ara ve çıkart"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/ai-chat">
              <Button variant="ghost" className="text-sm font-medium">
                AI'ya Sor
              </Button>
            </Link>

            <Link href="/uyelik">
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold text-sm">
                Üyelik Yükselt
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white cursor-pointer hover:scale-105 transition-transform"
              >
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </button>

              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">{user?.name || 'Kullanıcı'}</p>
                      <p className="text-sm text-gray-600">{user?.email || 'user@karganot.com'}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {user?.subscription === 'premium' ? 'Premium' : 'Ücretsiz'}
                      </span>
                    </div>

                    <Link 
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Profil</span>
                    </Link>

                    <Link 
                      href="/hesap-ayarlari"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Ayarlar</span>
                    </Link>

                    <Link 
                      href="/awards"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Award className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Ödüller</span>
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">Çıkış Yap</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-[61px] bottom-0 flex flex-col overflow-y-auto">
            
            {/* Navigation Links */}
            <div className="flex-1 p-4">
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Gösterge Paneli</span>
                </Link>

                <Link
                  href="/questions"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/questions')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Sorularınız</span>
                </Link>

                <Link
                  href="/library"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/library')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Kütüphane</span>
                </Link>

                <Link
                  href="/belge-yukle"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/belge-yukle')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span>Yüklemeler</span>
                </Link>
              </nav>
            </div>

            {/* Account Section */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Hesap
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">0 Kilit Açıldı</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">0 Öğretmen Sorusu</span>
                </div>
              </div>

              <Link href="/uyelik">
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold">
                  Güncelleme
                </Button>
              </Link>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={showSidebar ? 'flex-1 ml-64' : 'flex-1'}>
          {children}
        </main>
      </div>
    </div>
  )
}
