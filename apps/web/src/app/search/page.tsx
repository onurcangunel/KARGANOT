'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import { EVENTS } from '@/lib/analytics/events'
import { Search, Filter, Star, Download, Eye, Lock } from 'lucide-react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    university: 'all',
    course: 'all'
  })
  const track = useTrackEvent()

  const mockResults = [
    {
      id: 1,
      title: 'Calculus 1 Vize Notları',
      university: 'İstanbul Üniversitesi',
      course: 'Matematik',
      professor: 'Prof. Dr. Ahmet Yılmaz',
      rating: 4.8,
      downloads: 234,
      views: 1250,
      pages: 45,
      isLocked: false
    },
    {
      id: 2,
      title: 'Fizik 2 Final Çıkmış Sorular',
      university: 'ODTÜ',
      course: 'Fizik',
      professor: 'Dr. Mehmet Demir',
      rating: 4.5,
      downloads: 189,
      views: 890,
      pages: 23,
      isLocked: true
    },
    {
      id: 3,
      title: 'Organik Kimya Ders Notları',
      university: 'Boğaziçi Üniversitesi',
      course: 'Kimya',
      professor: 'Prof. Dr. Ayşe Kaya',
      rating: 4.9,
      downloads: 567,
      views: 2100,
      pages: 78,
      isLocked: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/karga-logo.png" alt="Karga Logo" width={40} height={40} className="rounded-xl" />
            <div className="text-2xl font-bold">
              <span className="text-[#FF6B00]">Karga</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    track(EVENTS.search, { query: searchQuery.trim() })
                  }
                }}
                placeholder="Not, ders veya üniversite ara..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:border-[#0066FF] focus:outline-none"
              />
            </div>
          </div>

          <Link href="/dashboard" className="text-[#0066FF] hover:text-blue-700 font-semibold">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filtreler</h2>
                <Filter className="w-5 h-5 text-gray-600" />
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none text-sm"
                  >
                    <option value="all">Tümü</option>
                    <option value="ders-notu">Ders Notu</option>
                    <option value="sınav">Sınav</option>
                    <option value="ödev">Ödev</option>
                    <option value="proje">Proje</option>
                  </select>
                </div>

                {/* University Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Üniversite</h3>
                  <select
                    value={filters.university}
                    onChange={(e) => setFilters({...filters, university: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none text-sm"
                  >
                    <option value="all">Tümü</option>
                    <option value="istanbul">İstanbul Üniversitesi</option>
                    <option value="odtu">ODTÜ</option>
                    <option value="bogazici">Boğaziçi</option>
                  </select>
                </div>

                {/* Course Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Ders</h3>
                  <select
                    value={filters.course}
                    onChange={(e) => setFilters({...filters, course: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none text-sm"
                  >
                    <option value="all">Tümü</option>
                    <option value="matematik">Matematik</option>
                    <option value="fizik">Fizik</option>
                    <option value="kimya">Kimya</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Results */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{mockResults.length}</span> sonuç bulundu
              </p>
            </div>

            <div className="space-y-4">
              {mockResults.map((result) => (
                <div key={result.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border-2 border-transparent hover:border-[#0066FF]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                        {result.title}
                        {result.isLocked && (
                          <Lock className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="font-semibold">{result.university}</span>
                        <span>•</span>
                        <span>{result.course}</span>
                        <span>•</span>
                        <span>{result.professor}</span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                          <span className="font-semibold">{result.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{result.downloads}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{result.views}</span>
                        </div>
                        <span>{result.pages} sayfa</span>
                      </div>
                    </div>

                    <div className="ml-6">
                      {result.isLocked ? (
                        <button className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Kilidi Aç</span>
                        </button>
                      ) : (
                        <Link
                          href={`/document/${result.id}`}
                          className="bg-[#0066FF] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Görüntüle</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}