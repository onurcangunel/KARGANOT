'use client'

import DocumentCard from './DocumentCard'
import { Loader2 } from 'lucide-react'

interface Document {
  id: string
  title: string
  course?: string
  university?: string
  faculty?: string
  department?: string
  thumbnail?: string
  views?: number
  rating?: number
  ratingCount?: number
  downloadCount?: number
  uploadedAt?: Date
  uploaderUsername?: string
  type?: 'note' | 'exam' | 'assignment' | 'project' | 'other'
  tags?: string[]
  verified?: boolean
}

interface DocumentGridProps {
  documents: Document[]
  loading?: boolean
  emptyMessage?: string
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export default function DocumentGrid({
  documents,
  loading = false,
  emptyMessage = 'Henüz döküman bulunamadı',
  columns = { sm: 1, md: 2, lg: 3, xl: 4 }
}: DocumentGridProps) {
  
  // Loading skeletons
  if (loading) {
    return (
      <div className={`grid gap-6 
        ${columns.sm === 1 ? 'grid-cols-1' : `grid-cols-${columns.sm}`} 
        ${columns.md ? `md:grid-cols-${columns.md}` : ''} 
        ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''} 
        ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''}
      `}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-100 aspect-[3/4] rounded-t-lg" />
            <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 bg-gray-200 rounded w-12" />
                <div className="h-6 bg-gray-200 rounded w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {emptyMessage}
            </h3>
            <p className="text-sm text-gray-500">
              Filtreleri değiştirmeyi veya yeni bir arama yapmayı deneyin
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Document grid
  return (
    <div className={`grid gap-6 
      grid-cols-1
      sm:grid-cols-${columns.sm || 1}
      md:grid-cols-${columns.md || 2}
      lg:grid-cols-${columns.lg || 3}
      xl:grid-cols-${columns.xl || 4}
    `}>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} {...doc} />
      ))}
    </div>
  )
}

// Separate loading component for better reusability
export function DocumentGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-100 aspect-[3/4] rounded-t-lg" />
          <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-gray-200 rounded w-12" />
              <div className="h-6 bg-gray-200 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
