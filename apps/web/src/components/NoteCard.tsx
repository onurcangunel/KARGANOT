'use client';

import Link from 'next/link';
import { Note } from '@/types';
import { formatPrice } from '@/lib/utils';
import { FileText, Star, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        {note.thumbnailKey ? (
          <img
            src={`/api/files/thumbnail/${note.thumbnailKey}`}
            alt={note.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileText className="w-16 h-16 text-blue-300" />
        )}
        {note.status === 'PENDING' && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Onay Bekliyor
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
          <Link href={`/note/${note.id}`}>
            {note.title}
          </Link>
        </h3>

        {/* Course Info */}
        {note.course && (
          <p className="text-sm text-gray-600 mb-2">
            {note.course.code} - {note.course.name}
          </p>
        )}

        {/* University */}
        {note.university && (
          <p className="text-xs text-gray-500 mb-3">
            {note.university.name}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{note.viewCount}</span>
          </div>
          {note.pageCount && (
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{note.pageCount} sayfa</span>
            </div>
          )}
          {note.averageRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{note.averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Seller */}
        {note.seller && (
          <p className="text-sm text-gray-500 mb-3">
            Satıcı: {note.seller.name}
          </p>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(note.price)}
          </span>
          <Button asChild>
            <Link href={`/note/${note.id}`}>
              İncele
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
