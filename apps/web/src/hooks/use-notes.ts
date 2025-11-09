import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notesService, type ListNotesParams } from '@/lib/services/notes';
import type { INote } from '@/types/api';
import toast from 'react-hot-toast';

export function useNotesList(params?: ListNotesParams) {
  return useQuery({
    queryKey: ['notes', params],
    queryFn: () => notesService.list(params),
    select: (res) => res.ok ? res.data.items : { items: [], pagination: { page: 1, limit: 0, total: 0 } },
    retry: 1,
  });
}

export function useNoteById(id?: string) {
  return useQuery({
    queryKey: ['note', id],
    enabled: !!id,
    queryFn: () => notesService.getById(id!),
    select: (res) => res.ok ? res.data : undefined,
  });
}

export function useRateNote(noteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { rating: number; comment?: string }) => notesService.rate(noteId, payload.rating, payload.comment),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success('Değerlendirme kaydedildi');
        qc.invalidateQueries({ queryKey: ['note', noteId] });
      } else {
        toast.error(res.error.message);
      }
    },
    onError: () => toast.error('Değerlendirme kaydedilemedi'),
  });
}

export function useReportNote(noteId: string) {
  return useMutation({
    mutationFn: (reason: string) => notesService.report(noteId, reason),
    onSuccess: (res) => {
      if (res.ok) toast.success('Rapor gönderildi');
      else toast.error(res.error.message);
    },
    onError: () => toast.error('Rapor gönderilemedi'),
  });
}

export function useDownloadNote(noteId: string) {
  return useMutation({
    mutationFn: () => notesService.download(noteId),
    onSuccess: (res) => {
      if (res.ok && res.data.url) {
        toast.success('İndirme başlatıldı');
        if (typeof window !== 'undefined') window.open(res.data.url, '_blank');
      } else {
        toast.error(res.ok ? 'Geçersiz indirme bağlantısı' : res.error.message);
      }
    },
    onError: () => toast.error('İndirme başlatılamadı'),
  });
}
