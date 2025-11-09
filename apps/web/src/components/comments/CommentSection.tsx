'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUp, ThumbsDown, MessageCircle, Flag, MoreVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale/tr'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Comment {
  id: string
  author: {
    username: string
    avatar?: string
    verified?: boolean
  }
  content: string
  upvotes: number
  downvotes: number
  createdAt: Date
  replies?: Comment[]
  userVote?: 'up' | 'down' | null
}

interface CommentItemProps {
  comment: Comment
  onReply: (commentId: string, content: string) => void
  onVote: (commentId: string, vote: 'up' | 'down') => void
  onReport: (commentId: string) => void
  depth?: number
}

function CommentItem({ comment, onReply, onVote, onReport, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showReplies, setShowReplies] = useState(true)

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    }
  }

  const netVotes = comment.upvotes - comment.downvotes

  return (
    <div className={`${depth > 0 ? 'ml-8 md:ml-12' : ''} mb-4`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
          <AvatarFallback className="bg-primary text-white">
            {comment.author.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1">
          {/* Author & Time */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-gray-900">
              @{comment.author.username}
            </span>
            {comment.author.verified && (
              <span className="text-xs bg-success text-white px-1.5 py-0.5 rounded">
                ✓ Doğrulandı
              </span>
            )}
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: tr })}
            </span>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onReport(comment.id)}>
                  <Flag className="w-4 h-4 mr-2" />
                  Rapor Et
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comment Text */}
          <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm">
            {/* Upvote */}
            <button
              onClick={() => onVote(comment.id, 'up')}
              className={`flex items-center gap-1 hover:text-primary transition-colors ${
                comment.userVote === 'up' ? 'text-primary font-semibold' : 'text-gray-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{netVotes > 0 ? `+${netVotes}` : netVotes}</span>
            </button>

            {/* Downvote */}
            <button
              onClick={() => onVote(comment.id, 'down')}
              className={`flex items-center gap-1 hover:text-destructive transition-colors ${
                comment.userVote === 'down' ? 'text-destructive font-semibold' : 'text-gray-600'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>

            {/* Reply Button */}
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Yanıtla
            </button>

            {/* Show/Hide Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showReplies ? 'Yanıtları Gizle' : `${comment.replies.length} Yanıtı Göster`}
              </button>
            )}
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Yanıtınızı yazın..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                >
                  Gönder
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsReplying(false)
                    setReplyContent('')
                  }}
                >
                  İptal
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onVote={onVote}
                  onReport={onReport}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (content: string) => void
  onReply: (commentId: string, content: string) => void
  onVote: (commentId: string, vote: 'up' | 'down') => void
  onReport: (commentId: string) => void
  sortBy?: 'top' | 'newest'
  onSortChange?: (sort: 'top' | 'newest') => void
}

export default function CommentSection({
  comments,
  onAddComment,
  onReply,
  onVote,
  onReport,
  sortBy = 'top',
  onSortChange
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Yorumlar ({comments.length})
        </h3>
        {onSortChange && (
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'top' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSortChange('top')}
            >
              En Beğenilenler
            </Button>
            <Button
              variant={sortBy === 'newest' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSortChange('newest')}
            >
              En Yeni
            </Button>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="space-y-3 bg-gray-50 rounded-lg p-4">
        <Textarea
          placeholder="Görüşlerinizi paylaşın..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] bg-white"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
          >
            Yorum Yap
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={onReply}
              onVote={onVote}
              onReport={onReport}
            />
          ))
        )}
      </div>
    </div>
  )
}
