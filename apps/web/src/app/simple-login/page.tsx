'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SimpleLoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Register form state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  
  // Form errors
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!loginEmail || !validateEmail(loginEmail)) {
      setError('Geçerli bir e-posta adresi girin')
      return
    }

    if (!loginPassword || loginPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalı')
      return
    }

    // Simulate login - save to localStorage
    const user = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      subscription: 'basic',
      loginTime: new Date().toISOString()
    }
    
    localStorage.setItem('karganot_user', JSON.stringify(user))
    router.push('/dashboard')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!registerName) {
      setError('Ad soyad gerekli')
      return
    }

    if (!registerEmail || !validateEmail(registerEmail)) {
      setError('Geçerli bir e-posta adresi girin')
      return
    }

    if (!registerPassword || registerPassword.length < 8) {
      setError('Şifre en az 8 karakter olmalı')
      return
    }

    // Simulate registration
    const user = {
      name: registerName,
      email: registerEmail,
      subscription: 'free',
      loginTime: new Date().toISOString()
    }
    
    localStorage.setItem('karganot_user', JSON.stringify(user))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Login/Register Card */}
      <div className="relative w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image 
              src="/image/logo.png" 
              alt="KARGANOT" 
              width={180} 
              height={72} 
              className="h-16 w-auto mx-auto"
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {activeTab === 'login' ? 'Tekrar Hoş Geldiniz!' : 'Hesap Oluştur'}
          </h1>
          <p className="text-gray-600 mt-2">
            {activeTab === 'login' 
              ? 'Öğrenmeye devam etmek için giriş yapın' 
              : 'KARGANOT ailesine katılın'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('login')
                setError('')
              }}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => {
                setActiveTab('register')
                setError('')
              }}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Kayıt Ol
            </button>
          </div>

          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Beni hatırla</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Şifremi Unuttum
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Giriş Yap
                </Button>

                {/* Demo Account Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Demo:</span> Herhangi bir email ve şifre ile giriş yapabilirsiniz
                  </p>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="En az 8 karakter"
                      className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {registerPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        <div className={`h-1 flex-1 rounded transition-colors ${registerPassword.length >= 2 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded transition-colors ${registerPassword.length >= 5 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded transition-colors ${registerPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Şifre güvenliği: {registerPassword.length < 5 ? 'Zayıf' : registerPassword.length < 8 ? 'Orta' : 'Güçlü'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded mt-1 border-gray-300" required />
                    <span className="ml-2 text-sm text-gray-600">
                      <Link href="/terms" className="text-blue-600 hover:underline font-medium">Kullanım Şartlarını</Link>
                      {' '}ve{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Gizlilik Politikasını</Link>
                      {' '}kabul ediyorum
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Hesap Oluştur
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <Link href="/privacy" className="hover:text-blue-600 mx-2 transition-colors">Gizlilik Politikası</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-blue-600 mx-2 transition-colors">Kullanım Şartları</Link>
          <span>•</span>
          <Link href="/help" className="hover:text-blue-600 mx-2 transition-colors">Yardım</Link>
        </div>
      </div>
    </div>
  )
}
