'use client';

import React, { useState } from 'react';
import { Bell, Upload, ChevronDown, Search, Home, FileText, HelpCircle, Crown, Image as ImageIcon, X, Menu, Sparkles, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState('home');
  const [showAITooltip, setShowAITooltip] = useState(false);

  const user = {
    name: 'Kullanıcı',
    email: 'kullanici@example.com',
    avatar: '/image/logo.png',
    isPremium: false
  };

  const navigationItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Home },
    { id: 'documents', label: 'Belgeler', icon: FileText },
    { id: 'qa', label: 'Soru & Cevap', icon: HelpCircle },
    { id: 'tutoring', label: 'Özel Ders', icon: GraduationCap }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar with Background Image */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/image/kargalar.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for opacity control */}
        <div className="absolute inset-0 bg-white opacity-85 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-105"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex items-center gap-2">
                {/* Larger responsive logo (use project logo image) */}
                <a href="/" className="block w-[140px] lg:w-[140px] md:w-[110px] sm:w-[90px]">
                  <img
                    src="/image/logo.png"
                    alt="KARGANOT logo"
                    className="w-full h-auto object-contain rounded-md"
                  />
                </a>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium hover:from-orange-500 hover:to-orange-600"
              >
                <Crown className="w-4 h-4" />
                <span>Premium Ol</span>
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => console.log('Profil Ayarları')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-all duration-200 cursor-pointer hover:scale-105"
                      >
                        Profil Ayarları
                      </button>
                      <button 
                        onClick={() => console.log('Ödeme')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-all duration-200 cursor-pointer hover:scale-105"
                      >
                        Ödeme
                      </button>
                      <button 
                        onClick={() => console.log('Çıkış Yap')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 transition-all duration-200 cursor-pointer hover:scale-105"
                      >
                        Çıkış Yap
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar - Desktop */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-6"
        >
          {/* User Profile Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Ücretsiz Hesap</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className="space-y-2 mb-6">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                  selectedNav === item.id
                    ? 'bg-orange-100 text-orange-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
            
            {/* AI Tab - Disabled with Tooltip */}
            <div className="relative">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * navigationItems.length }}
                onMouseEnter={() => setShowAITooltip(true)}
                onMouseLeave={() => setShowAITooltip(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out text-gray-400 cursor-not-allowed opacity-60"
                disabled
              >
                <Sparkles className="w-5 h-5" />
                <span>Yapay Zekâ</span>
              </motion.button>
              
              <AnimatePresence>
                {showAITooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
                  >
                    Yapay zekâ modülü çok yakında aktif olacak 🚀
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Premium Upgrade Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-auto p-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              <span className="font-bold">Premium Ol</span>
            </div>
            <p className="text-sm mb-3 text-orange-50">
              Tüm çalışma materyallerine ve özelliklere sınırsız erişim kazan
            </p>
            <button 
              onClick={() => console.log('Premium Yükseltme')}
              className="w-full bg-white text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-50 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md"
            >
              Şimdi Yükselt
            </button>
          </motion.div>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed left-0 top-0 w-72 h-full bg-white z-50 p-6 lg:hidden overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Menü</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Profile Card - Mobile */}
                <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Ücretsiz Hesap</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links - Mobile */}
                <nav className="space-y-2 mb-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedNav(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                        selectedNav === item.id
                          ? 'bg-orange-100 text-orange-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  
                  {/* AI Tab - Disabled (Mobile) */}
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed opacity-60"
                    disabled
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Yapay Zekâ (Yakında)</span>
                  </button>
                </nav>

                {/* Premium Upgrade Card - Mobile */}
                <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5" />
                    <span className="font-bold">Premium Ol</span>
                  </div>
                  <p className="text-sm mb-3 text-orange-50">
                    Tüm çalışma materyallerine sınırsız erişim kazan
                  </p>
                  <button 
                    onClick={() => console.log('Premium Yükseltme (Mobile)')}
                    className="w-full bg-white text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-50 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md"
                  >
                    Şimdi Yükselt
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
