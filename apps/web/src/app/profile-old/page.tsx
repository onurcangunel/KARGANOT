'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { User, Mail, Lock, Upload, Download, Eye, Star, Award, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const userStats = {
    uploads: 12,
    downloads: 45,
    views: 1240,
    rating: 4.7,
    unlocks: 3,
    points: 850
  }

  const uploadedDocs = [
    { id: 1, title: 'Calculus 1 Vize', views: 234, downloads: 89, rating: 4.8 },
    { id: 2, title: 'Fizik 2 Final', views: 156, downloads: 67, rating: 4.6 },
    { id: 3, title: 'Kimya Özet', views: 189, downloads: 45, rating: 4.9 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/karga-logo.png" alt="Karga Logo" width={40} height={40} className="rounded-xl" />
            <div className="text-2xl font-bold">
              <span className="text-[#FF6B00]">Karga</span>
            </div>
          </Link>
          <Link href="/dashboard" className="text-[#0066FF] hover:text-blue-700 font-semibold">
            ← Dashboard&apos;a Dön
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#0066FF] to-[#FF6B00] rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-[#0066FF]" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Ahmet Yılmaz</h1>
              <p className="text-blue-100 mb-1">ahmet@example.com</p>
              <p className="text-blue-100">İstanbul Üniversitesi - Bilgisayar Mühendisliği</p>
            </div>

            {/* Edit Button */}
            <button className="bg-white text-[#0066FF] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Profili Düzenle
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <Upload className="w-8 h-8 text-[#FF6B00] mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.uploads}</div>
            <div className="text-sm text-gray-600">Yüklenen Not</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <Download className="w-8 h-8 text-[#0066FF] mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.downloads}</div>
            <div className="text-sm text-gray-600">İndirme</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.views}</div>
            <div className="text-sm text-gray-600">Görüntülenme</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 fill-current" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.rating}</div>
            <div className="text-sm text-gray-600">Ortalama Puan</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex space-x-6 border-b mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'overview'
                  ? 'border-b-2 border-[#0066FF] text-[#0066FF]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('uploads')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'uploads'
                  ? 'border-b-2 border-[#0066FF] text-[#0066FF]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yüklediklerim
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'settings'
                  ? 'border-b-2 border-[#0066FF] text-[#0066FF]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ayarlar
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Achievement Badge */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                <div className="flex items-center space-x-4">
                  <Award className="w-12 h-12 text-yellow-500" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Bronz Üye</h3>
                    <p className="text-gray-600">850 puan - Gümüş üyeliğe 150 puan kaldı</p>
                  </div>
                </div>
                <div className="mt-4 bg-white rounded-full h-3 overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Son Aktiviteler</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Upload className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Calculus 1 Vize notunu yükledin</span>
                    <span className="text-gray-400">2 saat önce</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Download className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Fizik 2 Final notunu indirdin</span>
                    <span className="text-gray-400">1 gün önce</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uploads' && (
            <div className="space-y-4">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#0066FF] transition">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{doc.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" /> {doc.views}
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" /> {doc.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" /> {doc.rating}
                      </span>
                    </div>
                  </div>
                  <button className="text-[#0066FF] hover:text-blue-700 font-semibold">
                    Düzenle
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  defaultValue="Ahmet Yılmaz"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  defaultValue="ahmet@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Üniversite</label>
                <input
                  type="text"
                  defaultValue="İstanbul Üniversitesi"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <button className="w-full bg-[#0066FF] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Değişiklikleri Kaydet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}