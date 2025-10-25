'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Check,
  Info,
  CreditCard,
  Shield,
  Home,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Brain,
  Library,
  Bell,
  ChevronDown,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'plus' | 'pro'>('plus')
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'quarterly' | 'monthly'>('yearly')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')

  const features = [
    { name: 'Ders kaynaklarına erişim', hasInfo: true },
    { name: 'Uzman eğitmen desteği', hasInfo: true },
    { name: 'AI Chat ile PDF', hasInfo: true },
    { name: 'Ders kitabı çözümleri', hasInfo: true },
  ]

  const pricingOptions = {
    yearly: {
      price: '₺299',
      period: 'ay',
      total: '₺3.588',
      periodText: 'yıllık ücret',
      badge: '7 ay ücretsiz',
      popular: true
    },
    quarterly: {
      price: '₺499',
      period: 'ay',
      total: '₺1.497',
      periodText: 'üç aylık ücret',
      badge: '₺300/3ay tasarruf',
      popular: false
    },
    monthly: {
      price: '₺599',
      period: 'ay',
      total: '₺599',
      periodText: 'aylık ücret',
      badge: null,
      popular: false
    }
  }

  const currentPricing = pricingOptions[billingCycle]

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
              <Link href="/sinav-hazirlik" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Sınav Hazırlık</span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white cursor-pointer hover:scale-105 transition-transform">
                O
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-8">
          
          {/* Left Column - Plan Selection */}
          <div>
            
            {/* Plan Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Planınızı seçin</h2>
              
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setSelectedPlan('plus')}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedPlan === 'plus'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  KARGANOT Plus
                </button>
                <button
                  onClick={() => setSelectedPlan('pro')}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedPlan === 'pro'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  KARGANOT Pro
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature.name}</span>
                    </div>
                    {feature.hasInfo && (
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* AI Tools */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">QuillBot AI Yazım</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">Σ</span>
                    </div>
                    <span className="text-gray-700 font-medium">Symbolab Matematik Çözücü</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 border border-pink-200">
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Para İade Garantisi</h3>
                  <p className="text-sm text-gray-600">
                    İlk 30 gün içinde memnun kalmazsanız, tam iade yapılır.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Billing & Payment */}
          <div>
            
            {/* Billing Cycle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Fatura döngüsü</h2>
              
              <div className="space-y-3">
                {/* Yearly */}
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    billingCycle === 'yearly'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      billingCycle === 'yearly' ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {billingCycle === 'yearly' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">Yıllık</span>
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                          7 ay ücretsiz
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">₺3.588 yıllık ücret</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₺299</div>
                    <div className="text-sm text-gray-600">/ay</div>
                  </div>
                </button>

                {/* Quarterly */}
                <button
                  onClick={() => setBillingCycle('quarterly')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    billingCycle === 'quarterly'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      billingCycle === 'quarterly' ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {billingCycle === 'quarterly' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">3 Aylık</span>
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">
                          ₺300/3ay tasarruf
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">₺1.497 üç aylık ücret</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₺499</div>
                    <div className="text-sm text-gray-600">/ay</div>
                  </div>
                </button>

                {/* Monthly */}
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    billingCycle === 'monthly'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      billingCycle === 'monthly' ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {billingCycle === 'monthly' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-gray-900">Aylık</span>
                      <p className="text-sm text-gray-600">₺599 aylık ücret</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₺599</div>
                    <div className="text-sm text-gray-600">/ay</div>
                  </div>
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                İstediğiniz zaman durdurun veya iptal edin
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ödeme yöntemi</h2>
              
              <div className="space-y-3 mb-6">
                {/* Credit Card */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Kredi veya banka kartı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">VISA</span>
                    <span className="text-xs text-gray-500">Mastercard</span>
                    <span className="text-xs text-gray-500">Amex</span>
                  </div>
                </button>

                {/* PayPal */}
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'paypal' ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'paypal' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">PayPal</span>
                  </div>
                  <Shield className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Güvenli ödeme</span>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Üyeliğe Başla - {currentPricing.price}/{currentPricing.period}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Devam ederek <Link href="/terms" className="underline">Kullanım Şartlarını</Link> ve{' '}
                <Link href="/privacy" className="underline">Gizlilik Politikasını</Link> kabul etmiş olursunuz.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">KARGANOT Plus</span>
                  <span className="font-semibold text-gray-900">{currentPricing.price}/{currentPricing.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fatura Dönemi</span>
                  <span className="font-semibold text-gray-900">
                    {billingCycle === 'yearly' ? 'Yıllık' : billingCycle === 'quarterly' ? '3 Aylık' : 'Aylık'}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Toplam</span>
                  <span className="font-bold text-blue-600">{currentPricing.total}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
