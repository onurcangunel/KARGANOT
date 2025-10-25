'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Upload as UploadIcon, AlertCircle } from 'lucide-react'

// Components
import { FileUpload } from '@/components/FileUpload'
import { UniversitySelect, University } from '@/components/UniversitySelect'
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
interface Faculty {
  id: string
  name: string
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

  // Form state with React Hook Form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: '',
      description: '',
      universityId: '',
      facultyId: '',
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

  // Watch form values for dependent dropdowns
  const watchFile = watch('file')
  const watchTitle = watch('title')
  const watchDescription = watch('description')
  const watchUniversityId = watch('universityId')
  const watchFacultyId = watch('facultyId')
  const watchDepartmentId = watch('departmentId')

  // Selection states
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Dropdown data
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  // Loading states
  const [isLoadingFaculties, setIsLoadingFaculties] = useState(false)
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadStats, setUploadStats] = useState({ speed: 0, eta: 0, uploadedMB: 0, totalMB: 0 })
  const [uploadStartTime, setUploadStartTime] = useState<number>(0)

  // Fetch faculties when university changes
  useEffect(() => {
    if (selectedUniversity) {
      fetchFaculties(selectedUniversity.id)
      setValue('universityId', selectedUniversity.id)
    } else {
      setFaculties([])
      setSelectedFaculty(null)
      setSelectedDepartment(null)
      setSelectedCourse(null)
      setValue('universityId', '')
      setValue('facultyId', '')
      setValue('departmentId', '')
      setValue('courseId', null)
    }
  }, [selectedUniversity, setValue])

  // Fetch departments when faculty changes
  useEffect(() => {
    if (selectedFaculty) {
      fetchDepartments(selectedFaculty.id)
      setValue('facultyId', selectedFaculty.id)
    } else {
      setDepartments([])
      setSelectedDepartment(null)
      setSelectedCourse(null)
      setValue('facultyId', '')
      setValue('departmentId', '')
      setValue('courseId', null)
    }
  }, [selectedFaculty, setValue])

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
    if (selectedCourse) {
      setValue('courseId', selectedCourse.id)
    } else {
      setValue('courseId', null)
    }
  }, [selectedCourse, setValue])

  // Fetch faculties from API
  const fetchFaculties = async (universityId: string) => {
    setIsLoadingFaculties(true)
    try {
      const response = await axios.get(`/api/universities/${universityId}/faculties`)
      setFaculties(response.data.faculties || [])
    } catch (error) {
      console.error('Failed to fetch faculties:', error)
      toast.error('Fakülteler yüklenirken hata oluştu')
      setFaculties([])
    } finally {
      setIsLoadingFaculties(false)
    }
  }

  // Fetch departments from API
  const fetchDepartments = async (facultyId: string) => {
    setIsLoadingDepartments(true)
    try {
      const response = await axios.get(`/api/faculties/${facultyId}/departments`)
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
      toast.error('Dersler yüklenirken hata oluştu')
      setCourses([])
    } finally {
      setIsLoadingCourses(false)
    }
  }

  // Handle form submission
  const onSubmit = async (data: UploadFormData) => {
    if (!data.file) {
      toast.error('Lütfen bir dosya seçin')
      return
    }

    // Reset upload state
    setUploadProgress(0)
    setUploadStatus('uploading')
    setUploadError(null)
    setUploadStartTime(Date.now())

    // Create FormData
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)

            // Calculate stats
            const elapsedSeconds = (Date.now() - uploadStartTime) / 1000
            const stats = calculateUploadStats(
              progressEvent.loaded,
              progressEvent.total,
              elapsedSeconds
            )
            setUploadStats(stats)
          }
        },
      })

      // Success
      setUploadStatus('success')
      toast.success('Not başarıyla yüklendi! 🎉', {
        duration: 5000,
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        if (response.data?.document?.id) {
          router.push(`/documents/${response.data.document.id}`)
        } else {
          router.push('/dashboard')
        }
      }, 2000)
    } catch (error: any) {
      console.error('Upload failed:', error)
      setUploadStatus('error')
      const errorMessage =
        error.response?.data?.error || error.message || 'Dosya yüklenirken bir hata oluştu'
      setUploadError(errorMessage)
      toast.error(errorMessage, {
        duration: 6000,
      })
    }
  }

  // Character counters
  const titleLength = watchTitle?.length || 0
  const descriptionLength = watchDescription?.length || 0
  const titleRemaining = 200 - titleLength
  const descriptionRemaining = 2000 - descriptionLength

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UploadIcon className="w-8 h-8 text-blue-600" />
            Yeni Not Yükle
          </h1>
          <p className="mt-2 text-gray-600">
            Notlarını paylaş, diğer öğrencilere yardımcı ol!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload Section */}
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
                {errors.file.message}
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

          {/* Basic Info Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Not Bilgileri</h2>

            <div className="space-y-4">
              {/* Title */}
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
                  <div>
                    {errors.title && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      titleRemaining < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}
                  >
                    {titleRemaining} karakter kaldı
                  </p>
                </div>
              </div>

              {/* Description */}
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
                      placeholder="Notlarınız hakkında detaylı bilgi verin... Hangi konuları içeriyor? Nasıl hazırlandı? Kim için uygun?"
                      disabled={uploadStatus === 'uploading'}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}
                />
                <div className="flex justify-between mt-1">
                  <div>
                    {errors.description && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      descriptionRemaining < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}
                  >
                    {descriptionRemaining} karakter kaldı
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PART 2 CONTINUES IN NEXT FILE EDIT... */}
        </form>
      </div>
    </div>
  )
}
