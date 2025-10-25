'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Upload as UploadIcon, AlertCircle, Loader2 } from 'lucide-react'

// Components
import { FileUpload } from '@/components/FileUpload'
import { YokAtlasSelect } from '@/components/YokAtlasSelect'
import { DependentSelect } from '@/components/DependentSelect'
import { TagInput } from '@/components/TagInput'
import { ProgressBar } from '@/components/ProgressBar'

// Validation & Utils
import { uploadFormSchema, type UploadFormData } from '@/lib/validations/upload'
import { calculateUploadStats, getCurrentAcademicYear, getAcademicYearOptions } from '@/lib/fileUtils'
import {
  documentTypes,
  documentTypeLabels,
  semesters,
  semesterLabels,
  languages,
  languageLabels,
} from '@/lib/validations/upload'

// Types
interface UniversitySelection {
  universityId: string
  universityName: string
  unitId?: string
  unitName?: string
  unitType?: string
  city?: string
}

interface Department {
  id: string
  name: string
}

interface Course {
  id: string
  name: string
  code?: string
}

export default function UploadPage() {
  const router = useRouter()

  // Form state
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(uploadFormSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      universityId: '',
      universityUnitId: '',
      departmentId: '',
      courseId: null,
      documentType: 'DERS_NOTU',
      semester: null,
      academicYear: getCurrentAcademicYear(),
      tags: [],
      language: 'TR',
      pageCount: null,
      professor: null,
    },
  })

  // Watch form values
  const watchFile = watch('file')
  const watchTitle = watch('title')
  const watchDescription = watch('description')

  // Selection states
  const [selectedUniversity, setSelectedUniversity] = useState<UniversitySelection | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Dropdown data
  const [departments, setDepartments] = useState<Department[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  // Loading states
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadStats, setUploadStats] = useState({ speed: 0, eta: 0, uploadedMB: 0, totalMB: 0 })
  const [uploadStartTime, setUploadStartTime] = useState<number>(0)

  // Fetch departments when university/unit changes
  useEffect(() => {
    if (selectedUniversity) {
      setValue('universityId', selectedUniversity.universityId)
      setValue('universityUnitId', selectedUniversity.unitId || '')

      // If a unit is selected, fetch departments for that unit
      if (selectedUniversity.unitId) {
        fetchDepartments(selectedUniversity.unitId)
      } else {
        setDepartments([])
      }
    } else {
      setDepartments([])
      setSelectedDepartment(null)
      setSelectedCourse(null)
      setValue('universityId', '')
      setValue('universityUnitId', '')
      setValue('departmentId', '')
      setValue('courseId', null)
    }
  }, [selectedUniversity, setValue])

  // Fetch courses when department changes
  useEffect(() => {
    if (selectedDepartment) {
      fetchCourses(selectedDepartment.id)
      setValue('departmentId', selectedDepartment.id)
    } else {
      setCourses([])
      setSelectedCourse(null)
      setValue('departmentId', '')
      setValue('courseId', null)
    }
  }, [selectedDepartment, setValue])

  // Update courseId when course changes
  useEffect(() => {
    setValue('courseId', selectedCourse?.id || null)
  }, [selectedCourse, setValue])

  // Fetch departments from API (from UniversityUnit)
  const fetchDepartments = async (unitId: string) => {
    setIsLoadingDepartments(true)
    try {
      const response = await axios.get(`/api/units/${unitId}/departments`)
      setDepartments(response.data.departments || [])
    } catch (error) {
      console.error('Failed to fetch departments:', error)
      toast.error('Bölümler yüklenirken hata oluştu')
      setDepartments([])
    } finally {
      setIsLoadingDepartments(false)
    }
  }

  // Fetch courses from API
  const fetchCourses = async (departmentId: string) => {
    setIsLoadingCourses(true)
    try {
      const response = await axios.get(`/api/departments/${departmentId}/courses`)
      setCourses(response.data.courses || [])
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      setCourses([])
    } finally {
      setIsLoadingCourses(false)
    }
  }

  // Handle form submission
  const onSubmit = async (data: any) => {
    if (!data.file) {
      toast.error('Lütfen bir dosya seçin')
      return
    }

    setUploadProgress(0)
    setUploadStatus('uploading')
    setUploadError(null)
    setUploadStartTime(Date.now())

    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('universityId', data.universityId)
    formData.append('facultyId', data.facultyId)
    formData.append('departmentId', data.departmentId)
    if (data.courseId) formData.append('courseId', data.courseId)
    formData.append('documentType', data.documentType)
    if (data.semester) formData.append('semester', data.semester)
    if (data.academicYear) formData.append('academicYear', data.academicYear)
    if (data.tags.length > 0) formData.append('tags', JSON.stringify(data.tags))
    formData.append('language', data.language)
    if (data.pageCount) formData.append('pageCount', data.pageCount.toString())
    if (data.professor) formData.append('professor', data.professor)

    try {
      const response = await axios.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
            const elapsedSeconds = (Date.now() - uploadStartTime) / 1000
            const stats = calculateUploadStats(progressEvent.loaded, progressEvent.total, elapsedSeconds)
            setUploadStats(stats)
          }
        },
      })

      setUploadStatus('success')
      toast.success('Not başarıyla yüklendi! 🎉')
      setTimeout(() => {
        if (response.data?.document?.id) {
          router.push(`/dashboard`)
        } else {
          router.push('/dashboard')
        }
      }, 2000)
    } catch (error: any) {
      console.error('Upload failed:', error)
      setUploadStatus('error')
      const errorMessage = error.response?.data?.error || error.message || 'Dosya yüklenirken bir hata oluştu'
      setUploadError(errorMessage)
      toast.error(errorMessage)
    }
  }

  const titleLength = watchTitle?.length || 0
  const descriptionLength = watchDescription?.length || 0
  const titleRemaining = 200 - titleLength
  const descriptionRemaining = 2000 - descriptionLength

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UploadIcon className="w-8 h-8 text-blue-600" />
            Yeni Not Yükle
          </h1>
          <p className="mt-2 text-gray-600">Notlarını paylaş, diğer öğrencilere yardımcı ol!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📁 Dosya Seçimi</h2>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUpload
                  onFileSelect={(file) => field.onChange(file)}
                  uploadProgress={uploadProgress}
                  uploadStatus={uploadStatus}
                  errorMessage={uploadError || undefined}
                  disabled={uploadStatus === 'uploading'}
                />
              )}
            />
            {errors.file && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.file.message as string}
              </p>
            )}
          </div>

          {/* Upload Progress */}
          {uploadStatus === 'uploading' && (
            <ProgressBar
              progress={uploadProgress}
              status="uploading"
              fileName={watchFile?.name}
              uploadedSize={uploadStats.uploadedMB}
              totalSize={uploadStats.totalMB}
              speed={uploadStats.speed}
              estimatedTime={uploadStats.eta}
            />
          )}

          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Not Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Örn: Anayasa Hukuku Ders Notları"
                      disabled={uploadStatus === 'uploading'}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}
                />
                <div className="flex justify-between mt-1">
                  {errors.title && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title.message as string}
                    </p>
                  )}
                  <p className={`text-sm ml-auto ${titleRemaining < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {titleRemaining} karakter kaldı
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={5}
                      placeholder="Notlarınız hakkında detaylı bilgi verin..."
                      disabled={uploadStatus === 'uploading'}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description.message as string}
                    </p>
                  )}
                  <p className={`text-sm ml-auto ${descriptionRemaining < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {descriptionRemaining} karakter kaldı
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🏫 Akademik Bilgiler</h2>
            <div className="space-y-4">
              {/* YÖK Atlas Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Üniversite, Fakülte/MYO ve Bölüm <span className="text-red-500">*</span>
                </label>
                <YokAtlasSelect
                  value={{
                    university: selectedUniversity
                      ? {
                          id: selectedUniversity.universityId,
                          name: selectedUniversity.universityName,
                          slug: '',
                          city: selectedUniversity.city,
                        }
                      : undefined,
                  }}
                  onChange={(selection: any) => {
                    // Update university
                    if (selection.university) {
                      setSelectedUniversity({
                        universityId: selection.university.id,
                        universityName: selection.university.name,
                        city: selection.university.city,
                        unitId: selection.unit?.id,
                        unitName: selection.unit?.name,
                        unitType: selection.unit?.type,
                      })
                      setValue('universityId', selection.university.id)
                    }

                    // Update unit
                    if (selection.unit) {
                      setValue('universityUnitId', selection.unit.id)
                    }

                    // Update department
                    if (selection.department) {
                      setSelectedDepartment({
                        id: selection.department.id,
                        name: selection.department.name,
                      })
                      setValue('departmentId', selection.department.id)
                    }
                  }}
                  required
                  className="w-full"
                />
                {errors.universityId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.universityId.message as string}
                  </p>
                )}
                {errors.universityUnitId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.universityUnitId.message as string}
                  </p>
                )}
                {errors.departmentId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.departmentId.message as string}
                  </p>
                )}
              </div>

              {/* Course Selection (Optional) */}
              <DependentSelect
                value={selectedCourse}
                onChange={setSelectedCourse}
                options={courses}
                isLoading={isLoadingCourses}
                placeholder="Önce bölüm seçin (opsiyonel)..."
                disabled={!selectedDepartment || uploadStatus === 'uploading'}
                label="Ders"
              />
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📑 Ek Bilgiler</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İçerik Türü <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="documentType"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled={uploadStatus === 'uploading'}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>
                          {documentTypeLabels[type]}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dönem</label>
                  <Controller
                    name="semester"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={uploadStatus === 'uploading'}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seçin...</option>
                        {semesters.map((sem) => (
                          <option key={sem} value={sem}>
                            {semesterLabels[sem]}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Akademik Yıl</label>
                  <Controller
                    name="academicYear"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={uploadStatus === 'uploading'}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getAcademicYearOptions().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagInput
                      tags={field.value || []}
                      onChange={field.onChange}
                      placeholder="Etiket ekle... (Enter ile)"
                      maxTags={10}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        disabled={uploadStatus === 'uploading'}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {languageLabels[lang]}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Sayısı</label>
                  <Controller
                    name="pageCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseInt(e.target.value) : null
                          field.onChange(value)
                        }}
                        type="number"
                        min="1"
                        placeholder="Örn: 25"
                        disabled={uploadStatus === 'uploading'}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hoca Adı (Opsiyonel)</label>
                <Controller
                  name="professor"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value || null)}
                      type="text"
                      placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
                      disabled={uploadStatus === 'uploading'}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={uploadStatus === 'uploading'}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                İptal
              </button>

              <button
                type="submit"
                disabled={uploadStatus === 'uploading' || isSubmitting}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {uploadStatus === 'uploading' || isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-5 h-5" />
                    Yükle
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
