'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import PopularNotes from '@/components/landing/PopularNotes';
import EarnSection from '@/components/landing/EarnSection';
import Footer from '@/components/landing/Footer';
import AuthModal from '@/components/landing/AuthModal';
import Link from 'next/link';
import { Bell, ChevronDown, LogIn, UserPlus } from 'lucide-react';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn] = useState(false); // TODO: Get from auth context

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/image/logo.png" alt="KARGANOT" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#notlar" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Notlar
              </Link>
              <Link href="#kazanc" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Kazanç
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                İletişim
              </Link>
            </div>

            {/* Right Side - Auth Buttons or User Menu */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Giriş Yap</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Üye Ol</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        O
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link href="/profile" className="block px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">
                        Profilim
                      </Link>
                      <Link href="/dashboard" className="block px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">
                        Dashboard
                      </Link>
                      <div className="border-t my-2"></div>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-red-600">
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <div id="notlar">
          <PopularNotes />
        </div>
        <div id="kazanc">
          <EarnSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}

// KARGANOT UI Update - by Onur & Copilot
