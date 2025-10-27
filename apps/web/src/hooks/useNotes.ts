// KARGANOT MVP Build - by Onur & Copilot
// Notes Hook

import { useState, useEffect } from 'react';
import api, { ApiResponse } from '@/utils/api';

interface Note {
  id: string;
  title: string;
  description?: string;
  type: string;
  price: number;
  downloadCount: number;
  rating?: number;
  university?: string;
  course?: string;
}

/**
 * useNotes - Fetch and manage notes
 */
export function useNotes(filters?: {
  universityId?: string;
  facultyId?: string;
  departmentId?: string;
  courseId?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters?.universityId) params.append('universityId', filters.universityId);
        if (filters?.facultyId) params.append('facultyId', filters.facultyId);
        if (filters?.departmentId) params.append('departmentId', filters.departmentId);
        if (filters?.courseId) params.append('courseId', filters.courseId);
        if (filters?.type) params.append('type', filters.type);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await api.get<ApiResponse>(`/v1/notes?${params.toString()}`);

        if (response.data.success && response.data.data) {
          setNotes(response.data.data.notes);
          setTotal(response.data.data.total || 0);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Notlar yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [
    filters?.universityId,
    filters?.facultyId,
    filters?.departmentId,
    filters?.courseId,
    filters?.type,
    filters?.page,
    filters?.limit,
  ]);

  return {
    notes,
    isLoading,
    error,
    total,
  };
}

/**
 * useNoteDetail - Fetch single note detail
 */
export function useNoteDetail(noteId: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get<ApiResponse>(`/v1/notes/${noteId}`);

        if (response.data.success && response.data.data) {
          setNote(response.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Not yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  return {
    note,
    isLoading,
    error,
  };
}

/**
 * downloadNote - Download a note
 */
export async function downloadNote(noteId: string) {
  try {
    // Check freemium limit
    const downloadCount = parseInt(localStorage.getItem('downloadCount') || '0');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (!isPremium && downloadCount >= 3) {
      return {
        success: false,
        error: 'Ücretsiz indirme limitiniz doldu. Premium üyelik gereklidir.',
        requiresUpgrade: true,
      };
    }

    const response = await api.post<ApiResponse>(`/v1/notes/${noteId}/download`);

    if (response.data.success) {
      // Increment local download count
      if (!isPremium) {
        localStorage.setItem('downloadCount', (downloadCount + 1).toString());
      }

      return {
        success: true,
        downloadUrl: response.data.data?.url,
      };
    }

    throw new Error(response.data.message || 'İndirme başarısız');
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'İndirme başarısız',
    };
  }
}

/**
 * rateNote - Rate a note (1-10)
 */
export async function rateNote(noteId: string, score: number, comment?: string) {
  try {
    const response = await api.post<ApiResponse>(`/v1/notes/${noteId}/ratings`, {
      score,
      comment,
    });

    if (response.data.success) {
      return {
        success: true,
        message: 'Puanlama başarılı. Onaylandıktan sonra görünür olacak.',
      };
    }

    throw new Error(response.data.message || 'Puanlama başarısız');
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Puanlama başarısız',
    };
  }
}
