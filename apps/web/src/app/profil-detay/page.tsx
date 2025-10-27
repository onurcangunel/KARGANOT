'use client';

import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  FileText,
  DollarSign,
  Heart,
  Settings,
  Crown,
  Download,
  Eye,
  TrendingUp,
} from 'lucide-react';
import RatingBar10 from '@/components/RatingBar10';
import Link from 'next/link';

type TabType = 'general' | 'documents' | 'earnings' | 'favorites' | 'settings';

export default function ProfileDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isPremium] = useState(false);

  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    university: 'Boğaziçi Üniversitesi',
    department: 'Bilgisayar Mühendisliği',
    class: 3,
    memberSince: '2024-01-15',
    totalUploads: 12,
    totalDownloads: 234,
    totalEarnings: 1250.5,
    rating: 9.2,
  };

  const myDocuments = [
    {
      id: '1',
      title: 'Kalkülüs I - Final 2024',
      downloads: 45,
      earnings: 675,
      rating: 9.5,
      status: 'active',
    },
    {
      id: '2',
      title: 'Veri Yapıları Özet',
      downloads: 32,
      earnings: 384,
      rating: 8.8,
      status: 'active',
    },
    {
      id: '3',
      title: 'Fizik I Slaytları',
      downloads: 28,
      earnings: 224,
      rating: 9.0,
      status: 'pending',
    },
  ];

  const earningsHistory = [
    {
      id: '1',
      document: 'Kalkülüs I - Final 2024',
      amount: 15,
      date: '2024-01-20',
      buyer: 'Mehmet K.',
    },
    {
      id: '2',
      document: 'Veri Yapıları Özet',
      amount: 12,
      date: '2024-01-19',
      buyer: 'Ayşe S.',
    },
    {
      id: '3',
      document: 'Kalkülüs I - Final 2024',
      amount: 15,
      date: '2024-01-18',
      buyer: 'Ali T.',
    },
  ];

  const favorites = [
    {
      id: '1',
      title: 'Lineer Cebir Vize Çözümleri',
      university: 'İTÜ',
      price: 10,
      rating: 9.3,
    },
    {
      id: '2',
      title: 'Algoritma Analizi Özet',
      university: 'ODTÜ',
      price: 8,
      rating: 8.9,
    },
  ];

  const tabs = [
    { id: 'general', label: 'Genel Bilgiler', icon: User },
    { id: 'documents', label: 'Belgelerim', icon: FileText },
    { id: 'earnings', label: 'Kazançlarım', icon: DollarSign },
    { id: 'favorites', label: 'Favorilerim', icon: Heart },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-orange-600 text-4xl font-bold">
              {user.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {isPremium && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-orange-50 mb-2">
                {user.university} - {user.department}
              </p>
              <div className="flex items-center gap-4 text-sm text-orange-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Üyelik: {new Date(user.memberSince).toLocaleDateString('tr-TR')}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {user.totalUploads} belge
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {user.totalEarnings} ₺ kazanç
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-6 py-4 font-medium transition-colors whitespace-nowrap flex items-center gap-2 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-orange-600'
                      : 'text-gray-600 border-transparent hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Ad Soyad</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Üniversite</p>
                    <p className="font-medium text-gray-900">{user.university}</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Bilgileri Düzenle
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">İstatistikler</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                    <span className="text-gray-700">Toplam Yükleme</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{user.totalUploads}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700">Toplam İndirme</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{user.totalDownloads}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span className="text-gray-700">Toplam Kazanç</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{user.totalEarnings} ₺</span>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                    <span className="text-gray-700">Ortalama Puan</span>
                  </div>
                  <RatingBar10 rating={user.rating} readonly />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Belgelerim</h2>
              <Link href="/belgeler/yukle">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
                  Yeni Belge Yükle
                </button>
              </Link>
            </div>
            <div className="grid gap-4">
              {myDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            doc.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {doc.status === 'active' ? 'Aktif' : 'Onay Bekliyor'}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {doc.downloads} indirme
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {doc.earnings} ₺ kazanç
                        </span>
                        <RatingBar10 rating={doc.rating} readonly size="sm" />
                      </div>
                    </div>
                    <button className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-2">Toplam Kazanç</p>
                <p className="text-3xl font-bold text-green-600">{user.totalEarnings} ₺</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-2">Çekilebilir Bakiye</p>
                <p className="text-3xl font-bold text-orange-600">850.50 ₺</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-2">Bu Ay</p>
                <p className="text-3xl font-bold text-blue-600">325 ₺</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Kazanç Geçmişi</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Para Çek
                </button>
              </div>
              <div className="space-y-3">
                {earningsHistory.map((earning) => (
                  <div
                    key={earning.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{earning.document}</p>
                      <p className="text-sm text-gray-600">
                        {earning.buyer} - {new Date(earning.date).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-green-600">+{earning.amount} ₺</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Komisyon Oranları</h3>
              <p className="text-gray-700 mb-2">
                Her satıştan <strong>%70</strong> size, <strong>%30</strong> platforma aittir.
              </p>
              <p className="text-sm text-gray-600">
                Minimum çekim tutarı: <strong>50 ₺</strong>
              </p>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Favorilerim</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {favorites.map((fav) => (
                <Link href={`/belgeler/${fav.id}`} key={fav.id}>
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{fav.title}</h3>
                    <p className="text-gray-600 mb-3">{fav.university}</p>
                    <div className="flex items-center justify-between">
                      <RatingBar10 rating={fav.rating} readonly size="sm" />
                      <span className="text-xl font-bold text-orange-600">{fav.price} ₺</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Ayarlar</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Tercihleri</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">E-posta bildirimleri</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">Yeni satış bildirimleri</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-700">Kampanya bildirimleri</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Bilgileri</h3>
              <p className="text-gray-600 mb-4">Kazançlarınızı çekmek için banka bilgilerinizi ekleyin</p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Banka Bilgileri Ekle
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Güvenliği</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Şifre Değiştir
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  İki Faktörlü Doğrulama
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
