'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Star, Download, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

interface DocumentCardProps {
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

export default function DocumentCard({
  id,
  title,
  course,
  university,
  faculty,
  department,
  thumbnail,
  views = 0,
  rating = 0,
  ratingCount = 0,
  downloadCount = 0,
  uploadedAt = new Date(),
  uploaderUsername,
  type = 'note',
  tags = [],
  verified = false
}: DocumentCardProps) {
  
  const typeColors = {
    note: 'bg-blue-100 text-blue-700 border-blue-200',
    exam: 'bg-purple-100 text-purple-700 border-purple-200',
    assignment: 'bg-green-100 text-green-700 border-green-200',
    project: 'bg-orange-100 text-orange-700 border-orange-200',
    other: 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const typeLabels = {
    note: 'Ders Notu',
    exam: 'Sınav',
    assignment: 'Ödev',
    project: 'Proje',
    other: 'Diğer'
  }

  return (
    <Link href={`/file/${id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 overflow-hidden h-full">
        {/* Thumbnail */}
        <CardHeader className="p-0">
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300" />
              </div>
            )}
            
            {/* Type badge - top left */}
            <div className="absolute top-2 left-2">
              <Badge className={`${typeColors[type]} border shadow-sm`}>
                {typeLabels[type]}
              </Badge>
            </div>

            {/* Verified badge - top right */}
            {verified && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-success text-white border-none shadow-sm">
                  ✓ Doğrulandı
                </Badge>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Course & University Info */}
          <div className="space-y-1 mb-3">
            {course && (
              <p className="text-sm text-gray-700 font-medium line-clamp-1">
                📚 {course}
              </p>
            )}
            {university && (
              <p className="text-sm text-gray-600 line-clamp-1">
                🏫 {university}
              </p>
            )}
            {(faculty || department) && (
              <p className="text-xs text-gray-500 line-clamp-1">
                {faculty} {department && `• ${department}`}
              </p>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0 bg-gray-50 border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0 bg-gray-50 border-gray-200"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
            {/* Views */}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-xs font-medium">
                {rating.toFixed(1)}
              </span>
              {ratingCount > 0 && (
                <span className="text-xs text-gray-400">({ratingCount})</span>
              )}
            </div>

            {/* Downloads */}
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span className="text-xs">{downloadCount >= 1000 ? `${(downloadCount / 1000).toFixed(1)}K` : downloadCount}</span>
            </div>
          </div>

          {/* Upload info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
            {uploaderUsername && (
              <span className="truncate">
                👤 @{uploaderUsername}
              </span>
            )}
            <span className="text-xs">
              {formatDistanceToNow(uploadedAt, { addSuffix: true, locale: tr })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
