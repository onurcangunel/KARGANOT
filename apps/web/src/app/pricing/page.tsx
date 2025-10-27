// KARGANOT Frontend Perfection Update - by Onur & Copilot
'use client';

import React, { useState } from 'react';
import { Crown, Check, Zap, Download, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/utils/api';

export default function PricingPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (plan: 'FREE' | 'PREMIUM') => {
    if (plan === 'FREE') {
      alert('Zaten ücretsiz plandas inız!');
      return;
    }

    setIsProcessing(true);

    try {
      // Mock payment API call
      const response = await api.post('/v1/payments/subscribe', {
        plan: 'PREMIUM',
        amount: 19.99,
      });

      if (response.data.success) {
        alert('Ödeme sayfasına yönlendiriliyorsunuz...');
        // In real scenario: window.location.href = response.data.data.paymentUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ödeme işlemi başlatılamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  const plans = [
    {
      name: 'Ücretsiz',
      price: 0,
      period: 'Sonsuza Kadar',
      description: 'Platformu keşfet, sınırlı indirme yap',
      features: [
        '3 indirme / ay',
        'Temel arama özellikleri',
        'Not önizleme',
        'Yorum yapabilme',
        'Topluluk desteği',
      ],
      icon: Download,
      color: 'gray',
      recommended: false,
      cta: 'Mevcut Plan',
    },
    {
      name: 'Premium',
      price: 19.99,
      period: 'Aylık',
      description: 'Sınırsız erişim ve özel avantajlar',
      features: [
        'Sınırsız indirme',
        'Gelişmiş arama ve filtreler',
        'Öncelikli destek',
        'Reklamsız deneyim',
        'Özel içeriklere erişim',
        'Erken erişim özellikleri',
        'Premium rozeti',
        'Detaylı istatistikler',
      ],
      icon: Crown,
      color: 'orange',
      recommended: true,
      cta: 'Premium\'a Geç',
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Anında Erişim',
      description: 'Tüm notlara sınırsız ve anında erişim sağla',
    },
    {
      icon: Star,
      title: 'Premium Rozet',
      description: 'Profil ve yorumlarda öne çık',
    },
    {
      icon: Shield,
      title: 'Öncelikli Destek',
      description: 'Sorularına 24 saat içinde yanıt al',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/image/kargalar.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Crown className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">KARGANOT Premium</h1>
            <p className="text-xl text-orange-50 max-w-2xl mx-auto">
              Aylık ₺19.99 — sınırsız indirme ve özel avantajlar ile öğrenme deneyimini
              taşımaya hazır mısın?
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                plan.recommended ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Önerilen
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.color === 'orange'
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === 0 ? 'Ücretsiz' : `₺${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500 text-lg">/ {plan.period}</span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.color === 'orange' ? 'text-orange-500' : 'text-gray-400'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.name === 'Ücretsiz' ? 'FREE' : 'PREMIUM')}
                  disabled={isProcessing || plan.name === 'Ücretsiz'}
                  className={`w-full py-4 rounded-lg font-semibold transition-all ${
                    plan.color === 'orange'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? 'İşleniyor...' : plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Premium ile Neler Değişir?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Premium üyeliği nasıl iptal edebilirim?
              </h3>
              <p className="text-gray-600">
                Profil ayarlarından istediğiniz zaman üyeliğinizi iptal edebilirsiniz. İptal
                sonrası mevcut dönem sonuna kadar premium özelliklerden yararlanmaya devam
                edersiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Ücretsiz deneme süresi var mı?
              </h3>
              <p className="text-gray-600">
                Şu anda ücretsiz deneme sunmuyoruz, ancak ücretsiz plan ile platformu test
                edebilir, ayda 3 not indirebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ödeme güvenli mi?</h3>
              <p className="text-gray-600">
                Ödemeleriniz PayTR ve Iyzico gibi güvenilir ödeme sağlayıcıları üzerinden
                gerçekleşir. Kredi kartı bilgileriniz saklanmaz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Premium özellikleri ne zaman aktif olur?
              </h3>
              <p className="text-gray-600">
                Ödeme onaylandığında premium özellikleri anında kullanmaya başlayabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center text-white"
        >
          <Crown className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Hemen Premium'a Geç!</h2>
          <p className="text-orange-50 text-lg mb-8 max-w-2xl mx-auto">
            Sınırsız indirme ve özel avantajlarla öğrenme deneyimini bir üst seviyeye taşı.
          </p>
          <button
            onClick={() => handleSubscribe('PREMIUM')}
            disabled={isProcessing}
            className="px-12 py-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all shadow-xl font-semibold text-lg"
          >
            {isProcessing ? 'İşleniyor...' : 'Premium\'a Başla'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
