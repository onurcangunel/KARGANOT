'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import UniversityCascadeSelect from '@/components/UniversityCascadeSelect';
import RatingBar10 from '@/components/RatingBar10';

interface Document {
  id: string;
  title: string;
  university: string;
  faculty: string;
  department: string;
  course: string;
  instructor: string;
  type: 'Vize' | 'Final' | 'Ödev' | 'Proje' | 'Quiz' | 'Özet' | 'Slayt';
  price: number;
  downloads: number;
  rating: number;
  thumbnail: string;
  uploadDate: string;
  tags: string[];
}

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
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
    thumbnail: '/image/kargalar.png',
    uploadDate: '2024-01-15',
    tags: ['Çözümlü', '2024 Güz', 'Final'],
  },
  {
    id: '2',
    title: 'Veri Yapıları - Ağaçlar ve Graf Algoritmaları Özet',
    university: 'İstanbul Teknik Üniversitesi',
    faculty: 'Mühendislik Fakültesi',
    department: 'Bilgisayar Mühendisliği',
    course: 'Veri Yapıları',
    instructor: 'Doç. Dr. Mehmet Kaya',
    type: 'Özet',
    price: 12,
    downloads: 456,
    rating: 8.7,
    thumbnail: '/image/kargalar.png',
    uploadDate: '2024-01-10',
    tags: ['Özet', 'El Yazısı', 'Vize'],
  },
  {
    id: '3',
    title: 'Fizik I - Dinamik Hoca Slaytları',
    university: 'Orta Doğu Teknik Üniversitesi',
    faculty: 'Fen Edebiyat Fakültesi',
    department: 'Fizik',
    course: 'Fizik I',
    instructor: 'Prof. Dr. Ayşe Demir',
    type: 'Slayt',
    price: 8,
    downloads: 189,
    rating: 9.5,
    thumbnail: '/image/kargalar.png',
    uploadDate: '2024-01-08',
    tags: ['Slayt', 'Hoca Notu', '2024 Bahar'],
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    university?: string;
    faculty?: string;
    department?: string;
    class?: number;
    course?: string;
  }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');

  useEffect(() => {
    let filtered = documents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // University cascade filters
    if (selectedFilters.university) {
      filtered = filtered.filter((doc) => doc.university.includes(selectedFilters.university!));
    }
    if (selectedFilters.course) {
      filtered = filtered.filter((doc) => doc.course === selectedFilters.course!);
    }

    // Sorting
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDocuments(filtered);
  }, [searchQuery, selectedFilters, sortBy, documents]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Belgeler</h1>
          <p className="text-orange-50 text-lg">
            Binlerce kaliteli ders notu, özet ve sınav arşivine göz atın
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ders adı, hoca, konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtrele
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <UniversityCascadeSelect
                onSelectionChange={setSelectedFilters}
                initialValues={selectedFilters}
              />
            </div>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <strong>{filteredDocuments.length}</strong> belge bulundu
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="popular">En Popüler</option>
            <option value="recent">En Yeni</option>
            <option value="rating">En Yüksek Puan</option>
          </select>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Link href={`/belgeler/${doc.id}`} key={doc.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="w-24 h-24 object-contain opacity-30 group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {doc.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{doc.university}</p>
                  <p className="text-sm text-gray-600 mb-1">{doc.course}</p>
                  <p className="text-xs text-gray-500 mb-3">{doc.instructor}</p>

                  <div className="flex items-center justify-between mb-3">
                    <RatingBar10 rating={doc.rating} readonly size="sm" />
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Download className="w-4 h-4" />
                      {doc.downloads}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{doc.price} ₺</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      İncele
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belge bulunamadı</h3>
            <p className="text-gray-500">Farklı kriterler ile arama yapın</p>
          </div>
        )}
      </div>
    </div>
  );
}
