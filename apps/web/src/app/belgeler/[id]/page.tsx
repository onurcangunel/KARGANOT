'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Download,
  Eye,
  Star,
  Calendar,
  User,
  BookOpen,
  Tag,
  ArrowLeft,
  Lock,
  CheckCircle,
} from 'lucide-react';
import RatingBar10 from '@/components/RatingBar10';
import CommentModeration from '@/components/CommentModeration';

export default function DocumentDetailPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock document data
  const document = {
    id: params.id,
    title: 'Kalkülüs I - Final Sınavı 2024 Çözümlü',
    university: 'Boğaziçi Üniversitesi',
    faculty: 'Mühendislik Fakültesi',
    department: 'Bilgisayar Mühendisliği',
    course: 'Kalkülüs I',
    instructor: 'Prof. Dr. Ahmet Yılmaz',
    type: 'Final',
    price: 15,
    downloads: 234,
    rating: 9.2,
    uploadDate: '2024-01-15',
    uploader: 'Ahmet Y.',
    pages: 12,
    fileSize: '2.4 MB',
    tags: ['Çözümlü', '2024 Güz', 'Final'],
    description:
      'Bu belge, Kalkülüs I dersinin 2024 Güz dönemi final sınavının tam çözümlü halini içermektedir. Tüm sorular adım adım açıklanmış ve alternatif çözüm yolları gösterilmiştir.',
    preview: '/image/kargalar.png',
  };

  const handleDownload = () => {
    // Check freemium limit
    const downloads = parseInt(localStorage.getItem('downloadCount') || '0');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (!isPremium && downloads >= 3) {
      setShowUpgradeModal(true);
      return;
    }

    // Simulate download
    localStorage.setItem('downloadCount', (downloads + 1).toString());
    alert('Belge indiriliyor...');
    console.log('Downloaded:', document.title);
  };

  const mockComments = [
    {
      id: '1',
      author: 'Ayşe K.',
      text: 'Çok faydalı bir belge, sınava hazırlanırken çok işime yaradı. Teşekkürler!',
      rating: 10,
      status: 'approved' as const,
      createdAt: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      author: 'Mehmet S.',
      text: 'Çözümler çok detaylı anlatılmış, her adım çok net. Kesinlikle tavsiye ederim.',
      rating: 9,
      status: 'approved' as const,
      createdAt: '2024-01-18T14:20:00Z',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Preview and Download */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Preview */}
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg h-64 flex items-center justify-center mb-6">
                <img
                  src={document.preview}
                  alt={document.title}
                  className="w-32 h-32 object-contain opacity-40"
                />
              </div>

              {/* Price and Download */}
              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-orange-600">{document.price} ₺</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Hemen İndir
                </button>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    İndirmeler
                  </span>
                  <span className="font-semibold text-gray-900">{document.downloads}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Görüntülenmeler
                  </span>
                  <span className="font-semibold text-gray-900">
                    {document.downloads * 4}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sayfa Sayısı</span>
                  <span className="font-semibold text-gray-900">{document.pages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dosya Boyutu</span>
                  <span className="font-semibold text-gray-900">{document.fileSize}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 flex-1">{document.title}</h1>
                <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
                  {document.type}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <RatingBar10 rating={document.rating} readonly size="md" />
                <span className="text-gray-500 text-sm">({document.downloads} değerlendirme)</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <strong>Üniversite:</strong> {document.university}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <strong>Fakülte:</strong> {document.faculty}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <strong>Bölüm:</strong> {document.department}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <strong>Ders:</strong> {document.course}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-orange-500" />
                  <strong>Hoca:</strong> {document.instructor}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <strong>Yüklenme:</strong>{' '}
                  {new Date(document.uploadDate).toLocaleDateString('tr-TR')}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-orange-500" />
                  <strong>Yükleyen:</strong> {document.uploader}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {document.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed">{document.description}</p>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CommentModeration documentId={document.id as string} existingComments={mockComments} />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ücretsiz Limitiniz Doldu
              </h3>
              <p className="text-gray-600">
                İlk 3 indirmeniz ücretsizdi. Daha fazla belgeye erişmek için premium üyeliğe
                geçin!
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Premium Özellikler</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Sınırsız belge indirme
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Öncelikli destek
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Reklamsız deneyim
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Özel içeriklere erişim
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  alert('Ödeme sayfasına yönlendiriliyorsunuz...');
                  setShowUpgradeModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Premium'a Geç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
