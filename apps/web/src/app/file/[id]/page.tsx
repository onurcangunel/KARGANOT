'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommentSection from '@/components/comments/CommentSection'
import DocumentCard from '@/components/documents/DocumentCard'
import { 
  Download, 
  Eye, 
  Star, 
  Share2, 
  Flag, 
  BookOpen,
  School,
  Calendar,
  User,
  ThumbsUp
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

// Mock data - gerçek API'den gelecek
const MOCK_DOCUMENT = {
  id: '1',
  title: 'Calculus I - Final Sınav Hazırlık Notları',
  description: 'Limit, türev ve integral konularını kapsayan kapsamlı final sınav hazırlık notları. Tüm formüller ve örnek sorular dahil.',
  type: 'note' as const,
  course: 'Matematik 101 - Calculus I',
  university: 'MUĞLA SITKI KOÇMAN ÜNİVERSİTESİ',
  faculty: 'Mühendislik Fakültesi',
  department: 'Bilgisayar Mühendisliği',
  professor: 'Prof. Dr. Ahmet Yılmaz',
  semester: 'Güz 2024',
  fileUrl: '/documents/sample.pdf',
  pageCount: 45,
  fileSize: '3.2 MB',
  views: 12543,
  downloads: 3421,
  rating: 4.8,
  ratingCount: 234,
  uploadedAt: new Date('2024-10-15'),
  uploader: {
    username: 'student123',
    avatar: undefined,
    verified: true,
    totalUploads: 23,
    averageRating: 4.6
  },
  tags: ['matematik', 'calculus', 'final', 'türev', 'integral', 'limit'],
  verified: true
}

const MOCK_RELATED_DOCS = [
  {
    id: '2',
    title: 'Calculus I - Vize Sınav Notları',
    course: 'Matematik 101',
    university: 'MUĞLA SITKI KOÇMAN ÜNİVERSİTESİ',
    views: 8234,
    rating: 4.5,
    ratingCount: 145,
    uploadedAt: new Date('2024-09-20'),
    uploaderUsername: 'mathstudent',
    type: 'note' as const
  },
  {
    id: '3',
    title: 'Türev Formülleri Özet',
    course: 'Matematik 101',
    university: 'MUĞLA SITKI KOÇMAN ÜNİVERSİTESİ',
    views: 5621,
    rating: 4.9,
    ratingCount: 198,
    uploadedAt: new Date('2024-10-01'),
    uploaderUsername: 'formulaguru',
    type: 'note' as const,
    verified: true
  }
]

const MOCK_COMMENTS = [
  {
    id: '1',
    author: {
      username: 'student456',
      verified: true
    },
    content: 'Harika notlar! Final sınavımda çok yardımcı oldu. Teşekkürler!',
    upvotes: 45,
    downvotes: 2,
    createdAt: new Date('2024-10-20'),
    replies: [
      {
        id: '2',
        author: {
          username: 'student123',
          verified: true
        },
        content: 'Rica ederim! Başarılar dilerim.',
        upvotes: 12,
        downvotes: 0,
        createdAt: new Date('2024-10-21')
      }
    ]
  }
]

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('document')
  const [userRating, setUserRating] = useState(0)
  const [comments, setComments] = useState(MOCK_COMMENTS)

  const doc = MOCK_DOCUMENT // TODO: Fetch from API using params.id

  const handleDownload = () => {
    // TODO: Implement download
    console.log('Downloading document:', doc.id)
  }

  const handleRate = (rating: number) => {
    setUserRating(rating)
    // TODO: Submit rating to API
  }

  const handleAddComment = (content: string) => {
    // TODO: Add comment via API
    console.log('New comment:', content)
  }

  const handleReply = (commentId: string, content: string) => {
    // TODO: Add reply via API
    console.log('Reply to', commentId, ':', content)
  }

  const handleVote = (commentId: string, vote: 'up' | 'down') => {
    // TODO: Submit vote to API
    console.log('Vote', vote, 'on comment', commentId)
  }

  const handleReport = (commentId: string) => {
    // TODO: Report comment
    console.log('Report comment:', commentId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ========== MAIN CONTENT (LEFT) ========== */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Document Title & Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Ders Notu
                      </Badge>
                      {doc.verified && (
                        <Badge className="bg-success text-white">
                          ✓ Doğrulandı
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2">{doc.title}</CardTitle>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>

                {/* Document Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{doc.course}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <School className="w-4 h-4 text-gray-500" />
                    <span>{doc.university}</span>
                  </div>
                  {doc.professor && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{doc.professor}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{doc.semester}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs: Document / Q&A / Related */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="document" className="flex-1 sm:flex-none">
                  📄 Döküman
                </TabsTrigger>
                <TabsTrigger value="qa" className="flex-1 sm:flex-none">
                  💬 Sorular & Cevaplar
                </TabsTrigger>
                <TabsTrigger value="related" className="flex-1 sm:flex-none">
                  🔗 İlgili Dökümanlar
                </TabsTrigger>
              </TabsList>

              {/* Document Tab */}
              <TabsContent value="document" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    {/* PDF Viewer Placeholder */}
                    <div className="aspect-[8.5/11] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center text-gray-500">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">PDF Görüntüleyici</p>
                        <p className="text-sm mt-2">
                          {doc.pageCount} sayfa • {doc.fileSize}
                        </p>
                        <p className="text-xs mt-4">
                          📝 TODO: PDFViewer component entegre edilecek
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Q&A Tab */}
              <TabsContent value="qa" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <CommentSection
                      comments={comments}
                      onAddComment={handleAddComment}
                      onReply={handleReply}
                      onVote={handleVote}
                      onReport={handleReport}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Related Documents Tab */}
              <TabsContent value="related" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_RELATED_DOCS.map((relatedDoc) => (
                    <DocumentCard key={relatedDoc.id} {...relatedDoc} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </div>

          {/* ========== SIDEBAR (RIGHT) ========== */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İstatistikler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-4 h-4" />
                      Görüntülenme
                    </span>
                    <span className="font-semibold">{doc.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Download className="w-4 h-4" />
                      İndirme
                    </span>
                    <span className="font-semibold">{doc.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      Puan
                    </span>
                    <span className="font-semibold">
                      {doc.rating.toFixed(1)} ({doc.ratingCount})
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-4 space-y-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark"
                    size="lg"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    İndir
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <Flag className="w-4 h-4 mr-2" />
                    Bildir
                  </Button>
                </CardContent>
              </Card>

              {/* Rating */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bu Dökümana Puan Ver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRate(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= userRating
                              ? 'fill-secondary text-secondary'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {userRating} yıldız verdiniz
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Uploader Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Yükleyen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {doc.uploader.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">@{doc.uploader.username}</p>
                      {doc.uploader.verified && (
                        <span className="text-xs text-success">✓ Doğrulanmış</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center justify-between">
                      <span className="text-gray-600">Toplam Yükleme:</span>
                      <span className="font-medium">{doc.uploader.totalUploads}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-gray-600">Ortalama Puan:</span>
                      <span className="font-medium">{doc.uploader.averageRating.toFixed(1)}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(doc.uploadedAt, { addSuffix: true, locale: tr })} yüklendi
                  </p>
                </CardContent>
              </Card>

              {/* Tags */}
              {doc.tags && doc.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Etiketler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
