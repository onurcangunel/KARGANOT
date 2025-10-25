'use client';

import { useState } from 'react';
import { UniversityAutocomplete } from '@/components/UniversityAutocomplete';
import { FacultyAutocomplete } from '@/components/FacultyAutocomplete';
import { DepartmentAutocomplete } from '@/components/DepartmentAutocomplete';

export default function YokAtlasTestPage() {
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            YÖK Atlas Entegrasyonu
          </h1>
          <p className="text-lg text-slate-600">
            208+ üniversite, 1000+ fakülte, 5000+ bölüm verisi
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {/* University Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                1. Üniversite Seçin
              </label>
              <UniversityAutocomplete
                value={university}
                onChange={setUniversity}
                placeholder="Üniversite ara (örn: Muğla, ODTÜ, Boğaziçi)..."
              />
              {university && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  ✓ <span className="font-medium">{university}</span> seçildi
                </p>
              )}
            </div>

            {/* Faculty Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                2. Fakülte Seçin
              </label>
              <FacultyAutocomplete
                universityName={university || null}
                value={faculty}
                onChange={setFaculty}
                placeholder="Fakülte ara..."
              />
              {faculty && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  ✓ <span className="font-medium">{faculty}</span> seçildi
                </p>
              )}
            </div>

            {/* Department Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                3. Bölüm Seçin
              </label>
              <DepartmentAutocomplete
                universityName={university || null}
                facultyName={faculty || null}
                value={department}
                onChange={setDepartment}
                placeholder="Bölüm ara..."
              />
              {department && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  ✓ <span className="font-medium">{department}</span> seçildi
                </p>
              )}
            </div>
          </div>

          {/* Result Summary */}
          {university && faculty && department && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✅ Seçiminiz Tamamlandı
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-slate-700">Üniversite:</span>{' '}
                  <span className="text-slate-900">{university}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-700">Fakülte:</span>{' '}
                  <span className="text-slate-900">{faculty}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-700">Bölüm:</span>{' '}
                  <span className="text-slate-900">{department}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-blue-600 mb-1">208+</div>
            <div className="text-sm text-slate-600">Üniversite</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-green-600 mb-1">1000+</div>
            <div className="text-sm text-slate-600">Fakülte</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-purple-600 mb-1">5000+</div>
            <div className="text-sm text-slate-600">Bölüm</div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            🚀 Özellikler
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span><strong>Fuzzy Search:</strong> "odtü", "boğaziçi", "itu" gibi kısaltmalarla arama</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span><strong>Debounced Search:</strong> Her tuş vuruşunda istek gönderilmez (300ms debounce)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span><strong>Smart Caching:</strong> TanStack Query ile akıllı cache yönetimi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span><strong>Cascading Selection:</strong> Üniversite → Fakülte → Bölüm otomatik güncelleme</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span><strong>Responsive UI:</strong> TailwindCSS + shadcn/ui ile modern tasarım</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
