'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Bell, Upload, Image as ImageIcon, FileText, TrendingUp, Award, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { checkSession, getUser, logout, showNotification, debounce } from '@/lib/helpers'

export default function ModernHomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (!checkSession()) {
      router.push('/simple-login')
    } else {
      setUser(getUser())
    }
  }, [router])

  // Gelişmiş arama
  const handleSearch = debounce((query: string) => {
    if (query.length > 2) {
      // Mock arama sonuçları
      const mockResults = [
        { type: 'Ders', title: 'Matematik - Türev Hesabı', category: 'matematik', icon: '📐' },
        { type: 'Soru', title: 'Fizik - Newton Yasaları', category: 'fizik', icon: '⚛️' },
        { type: 'Not', title: 'Kimya - Periyodik Tablo', category: 'kimya', icon: '🧪' },
        { type: 'Döküman', title: 'Biyoloji - Hücre Yapısı', category: 'biyoloji', icon: '🧬' }
      ]
      setSearchResults(mockResults)
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }, 300)

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const suggestedQuestions = [
    { text: 'Galaksimiz ne kadar büyük?', emoji: '🪐', category: 'astronomy' },
    { text: 'Bir hücrenin önemli kısımlarını açıklayın', emoji: '🧬', category: 'biology' },
    { text: 'Bitkilerde fotosentez sürecini açıklayın', emoji: '🌳', category: 'botany' },
    { text: 'Muhasebe öğrenmenin en iyi yolları nelerdir?', emoji: '🧮', category: 'accounting' }
  ]

  if (!user) return null

  return (
    <div className="dashboard-container" data-theme={theme}>
      {/* Header Navigation */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo-section">
            <Link href="/home" className="flex items-center gap-3">
              <Image 
                src="/image/logo.png" 
                alt="KARGANOT" 
                width={80} 
                height={80}
                className="logo-animated"
              />
              <span className="logo-text">KARGANOT</span>
            </Link>
          </div>
          
          <div className="search-section">
            <div className="search-container">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Ders belgelerinden, sorulardan ve daha fazlasından ara..."
                className="main-search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
              />
              
              {/* Arama sonuçları dropdown */}
              {showSearchResults && (
                <div className="search-dropdown">
                  {searchResults.map((result, i) => (
                    <div key={i} className="search-result-item" onClick={() => {
                      router.push(`/search?q=${result.title}`)
                      setShowSearchResults(false)
                    }}>
                      <span className="result-icon">{result.icon}</span>
                      <div className="result-content">
                        <span className="result-type">{result.type}</span>
                        <span className="result-title">{result.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="user-section">
            <Link href="/ai-chat" className="ai-chat-btn">
              💬 AI'ya sor
            </Link>
            <Link href="/uyelik" className="upgrade-btn">
              ⚡ Güncelleme
            </Link>
            <button className="notifications">
              <Bell className="w-5 h-5" />
              <span className="notification-badge">3</span>
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="profile-dropdown">
              <button className="profile-btn">{user.name[0].toUpperCase()}</button>
              <div className="dropdown-menu">
                <Link href="/profile">👤 Profilim</Link>
                <Link href="/hesap-ayarlari">⚙️ Ayarlar</Link>
                <button onClick={handleLogout}>🚪 Çıkış Yap</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="main-content">
        {/* Sol Sidebar - Kullanıcı İstatistikleri */}
        <aside className="user-sidebar">
          <div className="user-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-number">12</span>
                <span className="stat-label">Çözülen Sorular</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <span className="stat-number">8</span>
                <span className="stat-label">Yüklenen Dosyalar</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <span className="stat-number">24</span>
                <span className="stat-label">Çalışma Puanı</span>
              </div>
            </div>

            <div className="stat-card achievement-card">
              <div className="achievement-badge">🏆</div>
              <p className="achievement-text">5 gün üst üste çalıştınız!</p>
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="quick-access">
            <h3 className="sidebar-title">Hızlı Erişim</h3>
            <Link href="/belge-yukle" className="quick-link">
              <Upload className="w-4 h-4" />
              <span>Belge Yükle</span>
            </Link>
            <Link href="/homework-help" className="quick-link">
              <BookOpen className="w-4 h-4" />
              <span>Ödev Yardımı</span>
            </Link>
            <Link href="/dashboard" className="quick-link">
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>
        </aside>

        {/* Merkezi İçerik */}
        <div className="center-content">
          {/* Karşılama Bölümü */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h1 className="greeting-title">
                {new Date().getHours() < 12 ? 'Günaydın' : 
                 new Date().getHours() < 18 ? 'İyi günler' : 'İyi akşamlar'}, {user.name}! 👋
              </h1>
              <p className="welcome-subtitle">Bugün ne öğrenmek istersiniz?</p>
            </div>
          </section>

          {/* AI Soru Bölümü */}
          <section className="ai-question-section">
            <div className="ai-container">
              <p className="ai-instruction">
                💡 AI'ya sorunuzu veya konunuzu sorun. Kişisel bilgilerinizi girmeyin.
              </p>
              
              <form onSubmit={handleAISubmit} className="ai-form">
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Örnek: Türev hesaplamada zincir kuralı nasıl uygulanır?"
                  className="ai-textarea"
                  rows={4}
                />
                
                <div className="input-section">
                  <div className="input-buttons">
                    <button type="button" className="input-btn image-btn">
                      <ImageIcon className="w-4 h-4" />
                      Resim ekle
                    </button>
                    <Link href="/belge-yukle" className="input-btn document-btn">
                      <FileText className="w-4 h-4" />
                      Belge yükle
                    </Link>
                  </div>
                  <button type="submit" className="send-btn" disabled={!aiQuestion.trim()}>
                    ↗️
                  </button>
                </div>
                
                <div className="policy-links">
                  <Link href="/topluluk-kurallari">Topluluk Kuralları</Link>,
                  <Link href="/telif-hakki">Telif Hakkı Politikası</Link> ve
                  <Link href="/onur-kodu">Onur Kodu</Link> geçerlidir.
                </div>
              </form>
            </div>
          </section>

          {/* Öneri Soruları */}
          <section className="suggested-questions">
            <h2 className="section-title">✨ Popüler Konular</h2>
            <div className="questions-grid">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  className="question-card"
                  data-category={q.category}
                  onClick={() => setAiQuestion(q.text)}
                >
                  <span className="question-emoji">{q.emoji}</span>
                  <span className="question-text">{q.text}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Yüklemeler Bölümü */}
          <section className="uploads-section">
            <div className="section-header">
              <h2 className="section-title">📄 Yüklemeleriniz</h2>
              <Link href="/belge-yukle" className="view-all-link">
                Tümünü Gör →
              </Link>
            </div>
            <div className="upload-area">
              <div className="empty-upload">
                <div className="empty-icon">📂</div>
                <p className="empty-text">Henüz yükleme yapmadınız</p>
                <Link href="/belge-yukle">
                  <Button className="upload-cta-btn">
                    <Upload className="w-4 h-4 mr-2" />
                    İlk Belgenizi Yükleyin
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Son Aktiviteler */}
          <section className="recent-activity">
            <h2 className="section-title">🕐 Son Aktiviteler</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <p className="activity-title">Matematik sorusu çözüldü</p>
                  <p className="activity-time">2 saat önce</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📤</div>
                <div className="activity-content">
                  <p className="activity-title">Fizik ders notu yüklendi</p>
                  <p className="activity-time">5 saat önce</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🎯</div>
                <div className="activity-content">
                  <p className="activity-title">Haftalık hedef tamamlandı</p>
                  <p className="activity-time">Dün</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sağ Sidebar - Öneriler */}
        <aside className="recommendations-sidebar">
          <div className="recommendation-card">
            <h3 className="recommendation-title">🎓 Önerilen Dersler</h3>
            <div className="recommendation-list">
              <div className="recommendation-item">
                <span className="rec-icon">📐</span>
                <span className="rec-text">Matematik 101</span>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">⚛️</span>
                <span className="rec-text">Fizik 201</span>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">💻</span>
                <span className="rec-text">Programlama</span>
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="premium-badge">⭐ PREMIUM</div>
            <h3 className="premium-title">Sınırsız Erişim</h3>
            <p className="premium-text">Tüm özelliklere sınırsız erişim için premium'a geçin</p>
            <Link href="/uyelik">
              <Button className="premium-btn">
                Şimdi Yükselt
              </Button>
            </Link>
          </div>
        </aside>
      </main>
    </div>
  )
}
