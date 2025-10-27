'use client';

import React from 'react';
import { BookOpen, Users, Target, Heart, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Aktif Öğrenci', value: '10,000+' },
    { icon: BookOpen, label: 'Paylaşılan Not', value: '50,000+' },
    { icon: Award, label: 'Üniversite', value: '200+' },
    { icon: TrendingUp, label: 'Kazanç Sağlayan', value: '5,000+' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Misyonumuz',
      description:
        'Türkiye\'deki tüm üniversite öğrencilerine kaliteli akademik içeriğe kolayca ulaşabilecekleri güvenilir bir platform sunmak.',
    },
    {
      icon: Heart,
      title: 'Vizyonumuz',
      description:
        'Üniversite öğrencilerinin birbirinden öğrendiği, bilgi paylaşımının teşvik edildiği en büyük akademik topluluk olmak.',
    },
    {
      icon: Users,
      title: 'Değerlerimiz',
      description:
        'Paylaşım kültürü, akademik dürüstlük, kalite standartları, topluluk odaklılık ve sürekli gelişim.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Hakkımızda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-orange-50"
          >
            Türkiye'nin en büyük akademik not paylaşım platformu
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              <strong>KargaNot</strong>, öğrenciden öğrenciye bilgi akışını hızlandırmak için kurulmuş yeni bir paylaşım platformudur. 
              Amacımız; notları, özetleri, ödev örneklerini ve sınav ipuçlarını düzenli bir yapıda bir araya getirerek 
              herkesin <strong>daha verimli çalışmasını</strong> sağlamaktır.
            </p>
            <p>
              Topluluğumuz <strong>şeffaflık, emek ve güven</strong> üzerine kuruludur. İçerik üreticilerinin emeğini korumak için 
              adil bir kazanç modeli sunar, telif ve kalite standartlarını gözetiriz. KargaNot'ta her öğrencinin sesi kıymetlidir: 
              Yorumlar, yıldızlı değerlendirmeler ve teşekkür sistemiyle en yararlı içeriklerin öne çıkmasını hedefleriz.
            </p>
            <p>
              <strong>Platform henüz yeni açıldı</strong> ve uzun bir altyapı geliştirme sürecinin ardından öğrencilerle buluşuyor. 
              MVP yaklaşımıyla önce çalışan bir prototip sunup, topluluk geri bildirimiyle hızla gelişmeyi benimsiyoruz. 
              Üniversite-Fakülte-Bölüm hiyerarşisi, dinamik filtreler, güçlü arama ve kişiselleştirilmiş önerilerle 
              öğrenme deneyimini taşımaya hazırız.
            </p>
            <p className="text-orange-600 font-semibold text-xl mt-6">
              Birlikte yükseliyoruz: Bilgini paylaş, değerini büyüt!
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🚀 Platform Yeni Açıldı!
            </h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-6">
              KargaNot, uzun bir teknik altyapı geliştirme sürecinin ardından öğrencilerle buluşuyor. 
              İlk kullanıcılarımızla birlikte büyüyecek, geri bildirimlerinizle şekillenecek ve 
              her geçen gün daha kullanışlı hale gelecek bir platform inşa ediyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <Target className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900 mb-1">Hedefimiz</p>
                <p className="text-sm text-gray-600">Öğrencilerin akademik başarısını artırmak</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <Users className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900 mb-1">Topluluğumuz</p>
                <p className="text-sm text-gray-600">Birlikte öğrenen, paylaşan, gelişen</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <Heart className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900 mb-1">Değerlerimiz</p>
                <p className="text-sm text-gray-600">Şeffaflık, emek, güven</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Misyon, Vizyon ve Değerlerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <value.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 bg-orange-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nasıl Çalışır?</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ücretsiz Kayıt Ol</h3>
                <p className="text-gray-700">
                  KargaNot'a ücretsiz kayıt ol ve hemen notları incelemeye başla. İlk 3 indirme
                  tamamen bedava!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Notları Keşfet ve İndir
                </h3>
                <p className="text-gray-700">
                  Üniversiteni, bölümünü ve dersini seç. Binlerce not arasından ihtiyacına uygun
                  olanı bul ve indir.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kendi Notlarını Paylaş</h3>
                <p className="text-gray-700">
                  Elindeki kaliteli notları yükle, fiyatını belirle ve her indirme için para kazan!
                  %70'i sana ait.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kazancını Çek</h3>
                <p className="text-gray-700">
                  Biriken kazançlarını istediğin zaman banka hesabına veya Papara'ya transfer et.
                  Minimum çekim tutarı 50 TL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Kalite Standartlarımız</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">✓</span>
                <p>
                  <strong>Manuel İnceleme:</strong> Yüklenen her not, yayına alınmadan önce ekibimiz
                  tarafından kontrol edilir.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">✓</span>
                <p>
                  <strong>Kullanıcı Puanlama:</strong> Öğrenciler notları 10 üzerinden puanlayabilir
                  ve yorum yapabilir.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">✓</span>
                <p>
                  <strong>Telif Koruma:</strong> Başka kaynaklardan alınan içerikler tespit edilir ve
                  kaldırılır.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">✓</span>
                <p>
                  <strong>Spam Engelleme:</strong> Otomatik sistemlerimiz spam ve düşük kaliteli
                  içerikleri filtreler.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-xl">✓</span>
                <p>
                  <strong>Raporlama Sistemi:</strong> Kullanıcılar uygunsuz içerikleri
                  raporlayabilir.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            KargaNot, deneyimli yazılım geliştiriciler, eğitim danışmanları ve öğrenci
            temsilcilerinden oluşan genç ve dinamik bir ekip tarafından yönetilmektedir.
          </p>
          <p className="text-lg text-gray-600">
            <strong>Onur Can Günel</strong> - Kurucu ve Geliştirici
          </p>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Bizimle İletişime Geçin</h2>
          <p className="text-lg text-orange-50 mb-6">
            Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.
          </p>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>E-posta:</strong> info@karganot.com
            </p>
            <p className="text-lg">
              <strong>Telefon:</strong> +90 (212) 555 01 23
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
