'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Upload as UploadIcon, FileText, X, Check, BookOpen, Calendar } from 'lucide-react'
import { yokAtlasService, YokAtlasUniversity, YokAtlasFaculty, YokAtlasDepartment } from '@/lib/yokatlas'

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    universityId: '',
    facultyId: '',
    programId: '',
    professor: '',
    semester: '',
    category: 'ders-notu'
  })

  const [universities, setUniversities] = useState<YokAtlasUniversity[]>([])
  const [faculties, setFaculties] = useState<YokAtlasFaculty[]>([])
  const [departments, setDepartments] = useState<YokAtlasDepartment[]>([])
  const [loading, setLoading] = useState(false)

  // Üniversiteleri yükle
  useEffect(() => {
    async function loadUniversities() {
      const data = await yokAtlasService.getAllUniversities()
      setUniversities(data)
    }
    loadUniversities()
  }, [])

  // Fakülteleri yükle
  useEffect(() => {
    if (formData.universityId) {
      async function loadFaculties() {
        setLoading(true)
        try {
          // Seçilen üniversitenin adını bul
          const selectedUni = universities.find(u => u.universityId === formData.universityId)
          const data = await yokAtlasService.getFacultiesByUniversity(
            formData.universityId, 
            selectedUni?.universityName
          )
          setFaculties(data)
        } catch (error) {
          console.error('Failed to load faculties:', error)
        } finally {
          setLoading(false)
        }
      }
      loadFaculties()
    } else {
      setFaculties([])
    }
  }, [formData.universityId, universities])

  // Bölümleri yükle
  useEffect(() => {
    if (formData.facultyId) {
      async function loadDepartments() {
        setLoading(true)
        try {
          const selectedFac = faculties.find(f => f.facultyId === formData.facultyId)
          const data = await yokAtlasService.getDepartmentsByFaculty(
            formData.facultyId,
            selectedFac?.facultyName
          )
          setDepartments(data)
        } catch (error) {
          console.error('Failed to load departments:', error)
        } finally {
          setLoading(false)
        }
      }
      loadDepartments()
    } else {
      setDepartments([])
    }
  }, [formData.facultyId, faculties])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Not Yükle & Kazan
          </h1>
          <p className="text-xl text-gray-600">
            Notlarını yükle, her yükleme için ücretsiz erişim kazan 🎉
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Step 1: Upload File */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Dosyanı Yükle
            </h2>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-2xl p-12 text-center transition ${
                dragActive ? 'border-[#0066FF] bg-blue-50' : 'border-gray-300'
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-between bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-12 h-12 text-green-600" />
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <>
                  <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Dosyayı sürükle bırak veya seç
                  </p>
                  <p className="text-gray-500 mb-6">
                    PDF, DOCX, PPT - Maksimum 50MB
                  </p>
                  <label className="inline-block">
                    <span className="bg-[#0066FF] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 cursor-pointer transition">
                      Dosya Seç
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Step 2: Document Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Doküman Bilgileri
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="örn: Calculus 1 Vize Notu"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Notun hakkında kısa bilgi..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Üniversite *
                  </label>
                  <select
                    value={formData.universityId}
                    onChange={(e) => setFormData({...formData, universityId: e.target.value, facultyId: '', programId: ''})}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">Üniversite Seçiniz</option>
                    {universities.map((uni) => (
                      <option key={uni.universityId} value={uni.universityId}>
                        {uni.universityName} {uni.city && `(${uni.city})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fakülte/Yüksekokul *
                  </label>
                  <select
                    value={formData.facultyId}
                    onChange={(e) => setFormData({...formData, facultyId: e.target.value, programId: ''})}
                    disabled={!formData.universityId || loading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">Fakülte Seçiniz</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.facultyId} value={faculty.facultyId}>
                        {faculty.facultyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bölüm *
                  </label>
                  <select
                    value={formData.programId}
                    onChange={(e) => setFormData({...formData, programId: e.target.value})}
                    disabled={!formData.facultyId || loading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">Bölüm Seçiniz</option>
                    {departments.map((dept) => (
                      <option key={dept.programId} value={dept.programId}>
                        {dept.programName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hoca
                  </label>
                  <input
                    type="text"
                    value={formData.professor}
                    onChange={(e) => setFormData({...formData, professor: e.target.value})}
                    placeholder="Prof. Dr. Ad Soyad"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dönem
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    placeholder="2024 Güz"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066FF] focus:outline-none"
                >
                  <option value="ders-notu">Ders Notu</option>
                  <option value="sınav">Sınav</option>
                  <option value="ödev">Ödev</option>
                  <option value="proje">Proje</option>
                  <option value="sunum">Sunum</option>
                  <option value="diğer">Diğer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-[#0066FF] to-[#FF6B00] rounded-2xl p-6 mb-8 text-white">
            <h3 className="text-xl font-bold mb-4">🎁 Kazanacakların:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>1 Ücretsiz doküman kilidi açma</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Toplulukta itibar puanı</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Diğer öğrencilere yardım et</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!uploadedFile || !formData.title || !formData.universityId || !formData.programId}
            className="w-full bg-[#0066FF] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
          >
            Notu Yükle & Kazan
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Yükleyerek <Link href="/terms" className="text-[#0066FF] hover:underline">Kullanım Şartları</Link>&apos;nı kabul etmiş olursunuz
          </p>
        </div>
      </div>
    </div>
  )
}