// KARGANOT Admin Moderation Page - by Onur & Copilot
'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';

interface PendingNote {
  id: string;
  title: string;
  description: string;
  courseCode: string;
  courseName: string;
  uploader: {
    id: string;
    name: string;
    email: string;
  };
  noteType: string;
  price: number;
  fileUrl: string;
  createdAt: string;
  tags: string[];
}

export default function AdminModerationPage() {
  const [pendingNotes, setPendingNotes] = useState<PendingNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<PendingNote | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Fetch pending notes
  useEffect(() => {
    fetchPendingNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPendingNotes = async () => {
    setLoading(true);
    try {
      // Mock data for development
      const mockData: PendingNote[] = [
        {
          id: '1',
          title: 'Nesneye Dayalı Programlama Vize Notu',
          description: 'OOP kavramları, sınıflar, kalıtım ve çok biçimlilik konularını içerir',
          courseCode: 'CS201',
          courseName: 'Nesneye Dayalı Programlama',
          uploader: {
            id: 'u1',
            name: 'Ahmet Yılmaz',
            email: 'ahmet@example.com',
          },
          noteType: 'VIZE',
          price: 15,
          fileUrl: '/uploads/mock-file-1.pdf',
          createdAt: new Date().toISOString(),
          tags: ['OOP', 'Java', 'Vize'],
        },
        {
          id: '2',
          title: 'Veri Yapıları Final Özeti',
          description: 'Ağaçlar, grafikler, sıralama algoritmaları detaylı anlatım',
          courseCode: 'CS202',
          courseName: 'Veri Yapıları',
          uploader: {
            id: 'u2',
            name: 'Ayşe Demir',
            email: 'ayse@example.com',
          },
          noteType: 'FINAL',
          price: 20,
          fileUrl: '/uploads/mock-file-2.pdf',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          tags: ['Veri Yapıları', 'Algoritmalar', 'Final'],
        },
        {
          id: '3',
          title: 'Lineer Cebir Proje Ödevi',
          description: 'Matris işlemleri ve doğrusal denklem sistemleri çözümü',
          courseCode: 'MATH101',
          courseName: 'Lineer Cebir',
          uploader: {
            id: 'u3',
            name: 'Mehmet Kaya',
            email: 'mehmet@example.com',
          },
          noteType: 'PROJE',
          price: 25,
          fileUrl: '/uploads/mock-file-3.pdf',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          tags: ['Matematik', 'Proje', 'Matrisler'],
        },
      ];

      // In production: const response = await api.get('/v1/admin/moderation/notes');
      // setPendingNotes(response.data.data);
      setPendingNotes(mockData);
    } catch (error) {
      console.error('Error fetching pending notes:', error);
      showToast('Onay bekleyen notlar yüklenemedi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (noteId: string) => {
    setActionLoading(noteId);
    try {
      // In production: await api.post(`/v1/admin/moderation/${noteId}/approve`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      setPendingNotes((prev) => prev.filter((note) => note.id !== noteId));
      showToast('Not başarıyla onaylandı ve yayınlandı!', 'success');
      setSelectedNote(null);
    } catch (error) {
      console.error('Error approving note:', error);
      showToast('Not onaylanırken hata oluştu', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (noteId: string) => {
    const reason = prompt('Ret nedeni (opsiyonel):');

    setActionLoading(noteId);
    try {
      // In production: await api.post(`/v1/admin/moderation/${noteId}/reject`, { reason });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      setPendingNotes((prev) => prev.filter((note) => note.id !== noteId));
      showToast('Not reddedildi ve yükleyiciye bildirim gönderildi', 'success');
      setSelectedNote(null);
    } catch (error) {
      console.error('Error rejecting note:', error);
      showToast('Not reddedilirken hata oluştu', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Az önce';
    if (diffHours < 24) return `${diffHours} saat önce`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} gün önce`;
  };

  const noteTypeLabels: Record<string, string> = {
    VIZE: 'Vize',
    FINAL: 'Final',
    ODEV: 'Ödev',
    PROJE: 'Proje',
    QUIZ: 'Quiz',
    OZET: 'Özet',
    SLAYT: 'Slayt',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-orange-600" />
            Yönetim Paneli
          </h1>
          <p className="text-gray-600">Onay bekleyen notları incele ve yönet</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bekleyen Notlar</p>
                <p className="text-3xl font-bold text-orange-600">{pendingNotes.length}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-200" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bugün Onaylanan</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bugün Reddedilen</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <XCircle className="w-12 h-12 text-red-200" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && pendingNotes.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hepsi Tamamlandı!</h3>
            <p className="text-gray-600">Şu anda onay bekleyen not bulunmuyor.</p>
          </div>
        )}

        {/* Pending Notes Table */}
        {!loading && pendingNotes.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Not Bilgisi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Yükleyen
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tür
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingNotes.map((note) => (
                    <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">{note.title}</p>
                            <p className="text-sm text-gray-600">
                              {note.courseCode} - {note.courseName}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {note.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{note.uploader.name}</p>
                            <p className="text-xs text-gray-500">{note.uploader.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {noteTypeLabels[note.noteType] || note.noteType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">₺{note.price}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(note.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedNote(note)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Detay"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleApprove(note.id)}
                            disabled={actionLoading === note.id}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === note.id ? '...' : 'Onayla'}
                          </button>
                          <button
                            onClick={() => handleReject(note.id)}
                            disabled={actionLoading === note.id}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === note.id ? '...' : 'Reddet'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedNote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedNote(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedNote.title}</h2>
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Ders</label>
                      <p className="text-gray-900">
                        {selectedNote.courseCode} - {selectedNote.courseName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Açıklama</label>
                      <p className="text-gray-900">{selectedNote.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Yükleyen</label>
                      <p className="text-gray-900">
                        {selectedNote.uploader.name} ({selectedNote.uploader.email})
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Tür</label>
                        <p className="text-gray-900">
                          {noteTypeLabels[selectedNote.noteType] || selectedNote.noteType}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Fiyat</label>
                        <p className="text-gray-900">₺{selectedNote.price}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Etiketler</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedNote.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(selectedNote.id)}
                      disabled={actionLoading === selectedNote.id}
                      className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {actionLoading === selectedNote.id ? 'İşleniyor...' : 'Onayla'}
                    </button>
                    <button
                      onClick={() => handleReject(selectedNote.id)}
                      disabled={actionLoading === selectedNote.id}
                      className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      {actionLoading === selectedNote.id ? 'İşleniyor...' : 'Reddet'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div
                className={`px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 ${
                  toast.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {toast.type === 'success' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
                <p className="font-medium">{toast.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
