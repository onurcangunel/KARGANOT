'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Clock, CheckCircle, X } from 'lucide-react';
import RatingBar10 from './RatingBar10';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface CommentModerationProps {
  documentId: string;
  existingComments?: Comment[];
  isAdmin?: boolean;
}

export default function CommentModeration({
  documentId,
  existingComments = [],
  isAdmin = false,
}: CommentModerationProps) {
  const [comments, setComments] = useState<Comment[]>(existingComments);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const approvedComments = comments.filter((c) => c.status === 'approved');
  const pendingComments = comments.filter((c) => c.status === 'pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || newRating === 0) {
      alert('Lütfen yorum ve puan giriniz.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Mevcut Kullanıcı',
      text: newComment,
      rating: newRating,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setComments([comment, ...comments]);
      setNewComment('');
      setNewRating(0);
      setIsSubmitting(false);
      alert('Yorumunuz gönderildi! Onaylandıktan sonra görünür olacaktır.');
    }, 500);
  };

  const handleApprove = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'approved' as const } : c))
    );
  };

  const handleReject = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'rejected' as const } : c))
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          Yorum Yap ve Puanla
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Puanınız (1-10)
            </label>
            <RatingBar10 rating={newRating} onRate={setNewRating} size="lg" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Yorumunuz
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Bu notu değerlendirin..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || newRating === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
          </button>
          <p className="text-xs text-gray-500">
            * Yorumunuz moderatör onayından sonra yayınlanacaktır.
          </p>
        </form>
      </div>

      {/* Admin Panel */}
      {isAdmin && pendingComments.length > 0 && (
        <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Onay Bekleyen Yorumlar ({pendingComments.length})
            </h3>
            <button
              onClick={() => setShowPending(!showPending)}
              className="text-sm text-yellow-700 underline"
            >
              {showPending ? 'Gizle' : 'Göster'}
            </button>
          </div>
          {showPending && (
            <div className="space-y-3">
              {pendingComments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{comment.author}</p>
                      <RatingBar10 rating={comment.rating} readonly size="sm" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(comment.id)}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        title="Onayla"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(comment.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Reddet"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(comment.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Approved Comments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Yorumlar ({approvedComments.length})
        </h3>
        {approvedComments.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Henüz onaylanmış yorum bulunmuyor.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvedComments.map((comment) => (
              <div key={comment.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {comment.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{comment.author}</p>
                      <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                    </div>
                    <RatingBar10 rating={comment.rating} readonly size="sm" showNumber={false} />
                    <p className="text-gray-700 mt-3 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
