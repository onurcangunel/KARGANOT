'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Menu, X, Search, Upload, User, LogOut, Settings, BookOpen, Heart } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" href="/" />
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Ders, üniversite veya döküman ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Navigation Links */}
            <Link
              href="/landing"
              className="px-3 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/belgeler"
              className="px-3 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Belgeler
            </Link>
            <Link
              href="/hakkimizda"
              className="px-3 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Hakkımızda
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
            >
              Premium
            </Link>

            {/* Upload Button */}
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              <Link href="/belgeler/yukle" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Yükle
              </Link>
            </Button>

            {isAuthenticated ? (
              /* Logged In User Menu */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="/avatar.jpg" alt={user?.name || 'User'} />
                      <AvatarFallback className="bg-primary text-white">
                        {(user?.name?.[0] || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Favorilerim
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Ayarlar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 flex items-center gap-2" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not Logged In */
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Giriş Yap</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary-dark">
                  <Link href="/register">Kayıt Ol</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </form>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/landing"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/belgeler"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Belgeler
              </Link>
              <Link
                href="/hakkimizda"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 py-2 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
              <Link
                href="/belgeler/yukle"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Upload className="w-5 h-5" />
                Not Yükle
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Profil
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Favorilerim
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    Ayarlar
                  </Link>
                  <button className="flex items-center gap-2 text-red-600 hover:text-red-700 py-2 text-left" onClick={logout}>
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Giriş Yap
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Kayıt Ol
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
