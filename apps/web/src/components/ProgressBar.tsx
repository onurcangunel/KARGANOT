'use client'

import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

// Helper: Format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// Helper: Format time (seconds to readable format)
function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const minutes = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${minutes}m ${secs}s`
}

// Props interface
interface ProgressBarProps {
  progress: number // 0-100
  status?: 'uploading' | 'success' | 'error'
  fileName?: string
  uploadedSize?: number // in MB
  totalSize?: number // in MB
  speed?: number // in MB/s
  estimatedTime?: number // in seconds
  errorMessage?: string
}

export function ProgressBar({
  progress,
  status = 'uploading',
  fileName,
  uploadedSize,
  totalSize,
  speed,
  estimatedTime,
  errorMessage,
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  // Status colors
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'uploading':
      default:
        return clampedProgress === 100 ? 'bg-green-500' : 'bg-blue-600'
    }
  }

  const getBackgroundColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50'
      case 'error':
        return 'bg-red-50'
      case 'uploading':
      default:
        return 'bg-blue-50'
    }
  }

  const getBorderColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-200'
      case 'error':
        return 'border-red-200'
      case 'uploading':
      default:
        return 'border-blue-200'
    }
  }

  return (
    <div className={`w-full border rounded-lg p-4 ${getBorderColor()} ${getBackgroundColor()}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {status === 'uploading' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
          
          <span className="font-medium text-gray-900">
            {status === 'uploading' && 'Yükleniyor...'}
            {status === 'success' && 'Yükleme tamamlandı!'}
            {status === 'error' && 'Yükleme hatası'}
          </span>
        </div>

        {/* Progress Percentage */}
        <span
          className={`text-sm font-semibold ${
            status === 'success'
              ? 'text-green-600'
              : status === 'error'
              ? 'text-red-600'
              : 'text-blue-600'
          }`}
        >
          {clampedProgress}%
        </span>
      </div>

      {/* File Name */}
      {fileName && (
        <p className="text-sm text-gray-700 mb-3 truncate" title={fileName}>
          {fileName}
        </p>
      )}

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${getStatusColor()}`}
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Animated gradient for uploading state */}
          {status === 'uploading' && clampedProgress < 100 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        {/* Left Side: Size Info */}
        <div className="flex items-center gap-4">
          {uploadedSize !== undefined && totalSize !== undefined && (
            <span>
              {formatFileSize(uploadedSize * 1024 * 1024)} / {formatFileSize(totalSize * 1024 * 1024)}
            </span>
          )}
          
          {speed !== undefined && status === 'uploading' && (
            <span className="text-blue-600 font-medium">{speed.toFixed(1)} MB/s</span>
          )}
        </div>

        {/* Right Side: ETA */}
        {estimatedTime !== undefined && status === 'uploading' && estimatedTime > 0 && (
          <span className="text-gray-500">
            Kalan: {formatTime(estimatedTime)}
          </span>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <p className="mt-3 text-sm text-red-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </p>
      )}

      {/* Success Message */}
      {status === 'success' && (
        <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Dosyanız başarıyla yüklendi ve işleniyor.</span>
        </p>
      )}
    </div>
  )
}

// Add shimmer animation to globals.css or tailwind config
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }
