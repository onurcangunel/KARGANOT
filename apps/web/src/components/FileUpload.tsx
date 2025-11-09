'use client'

import { useCallback, useState } from 'react'
import { useDropzone, type DropzoneOptions, type FileRejection, type DropEvent } from 'react-dropzone'
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

// File validation constants
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ALLOWED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
}

// Helper: Format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// Helper: Get file icon
function getFileIcon(type: string) {
  if (type.includes('pdf')) return '📄'
  if (type.includes('word')) return '📝'
  if (type.includes('presentation')) return '📊'
  if (type.includes('image')) return '🖼️'
  return '📁'
}

// Props interface
interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  onUploadProgress?: (progress: number) => void
  maxSize?: number
  accept?: Record<string, string[]>
  multiple?: boolean
  disabled?: boolean
  uploadProgress?: number
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error'
  errorMessage?: string
}

export function FileUpload({
  onFileSelect,
  onUploadProgress,
  maxSize = MAX_FILE_SIZE,
  accept = ALLOWED_TYPES,
  multiple = false,
  disabled = false,
  uploadProgress = 0,
  uploadStatus = 'idle',
  errorMessage,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle file selection
  const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>( 
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[], _event: DropEvent) => {
      // Clear previous errors
      setError(null)

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError(`Dosya çok büyük! Maksimum ${formatFileSize(maxSize)} yüklenebilir.`)
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setError('Geçersiz dosya tipi! Sadece PDF, DOCX, PPTX, JPG ve PNG kabul edilir.')
        } else {
          setError('Dosya yüklenirken bir hata oluştu.')
        }
        return
      }

      // Handle accepted file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        onFileSelect(file)

        // Generate preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreview(reader.result as string)
          }
          reader.readAsDataURL(file)
        } else {
          setPreview(null)
        }
      }
    },
    [maxSize, onFileSelect]
  )

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: disabled || uploadStatus === 'uploading',
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  } as DropzoneOptions)

  // Handle remove file
  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
    onFileSelect(null)
  }

  // Render: Uploading state
  if (uploadStatus === 'uploading' && selectedFile) {
    return (
      <div className="w-full border-2 border-blue-300 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">{getFileIcon(selectedFile.type)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="font-medium text-gray-900">Yükleniyor...</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{selectedFile.name}</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>{uploadProgress}%</span>
              <span>{formatFileSize(selectedFile.size)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render: Success state
  if (uploadStatus === 'success' && selectedFile) {
    return (
      <div className="w-full border-2 border-green-300 bg-green-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">{getFileIcon(selectedFile.type)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Başarıyla yüklendi!</span>
            </div>
            <p className="text-sm text-gray-700">{selectedFile.name}</p>
            <p className="text-xs text-gray-500 mt-1">{formatFileSize(selectedFile.size)}</p>
          </div>
        </div>
      </div>
    )
  }

  // Render: Error state
  if (uploadStatus === 'error') {
    return (
      <div className="w-full border-2 border-red-300 bg-red-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">Yükleme hatası</h4>
            <p className="text-sm text-red-700">{errorMessage || 'Dosya yüklenirken bir hata oluştu.'}</p>
            <button
              onClick={handleRemove}
              className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Tekrar dene
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render: File selected (idle state with file)
  if (selectedFile && uploadStatus === 'idle') {
    return (
      <div className="w-full border-2 border-green-300 bg-green-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          {/* Preview or Icon */}
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          ) : (
            <div className="text-3xl">{getFileIcon(selectedFile.type)}</div>
          )}

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <span>{formatFileSize(selectedFile.size)}</span>
                  <span>•</span>
                  <span>{selectedFile.type.split('/')[1].toUpperCase()}</span>
                </div>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={handleRemove}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Kaldır"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Indicator */}
            <div className="flex items-center gap-2 mt-3 text-sm text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span>Dosya seçildi, yüklemeye hazır</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render: Empty state (drag & drop zone)
  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
  <input {...getInputProps({})} />
        
        {/* Icon */}
        <div className="mx-auto w-12 h-12 mb-4 text-gray-400">
          {isDragActive ? (
            <Upload className="w-full h-full" />
          ) : (
            <File className="w-full h-full" />
          )}
        </div>

        {/* Text */}
        {isDragActive ? (
          <p className="text-lg font-medium text-blue-600 mb-2">Dosyayı bırakın</p>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Dosya Sürükle veya Tıkla
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PDF, DOCX, PPTX, JPG, PNG
            </p>
            <p className="text-xs text-gray-400">Maksimum {formatFileSize(maxSize)}</p>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
