import api from '@/utils/api';
import type { IApiResponse, INote, IPagination } from '@/types/api';

export interface ListNotesParams {
  page?: number;
  limit?: number;
  search?: string;
  university?: string;
  course?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'downloads' | 'createdAt';
}

export const notesService = {
  async list(params?: ListNotesParams) {
    const { data } = await api.get<IApiResponse<{ items: INote[]; pagination: IPagination }>>('/v1/notes', { params });
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get<IApiResponse<INote>>(`/v1/notes/${id}`);
    return data;
  },

  async rate(noteId: string, rating: number, comment?: string) {
    const { data } = await api.post<IApiResponse<INote>>(`/v1/notes/${noteId}/ratings`, { rating, comment });
    return data;
  },

  async report(noteId: string, reason: string) {
    const { data } = await api.post<IApiResponse<{ id: string }>>(`/v1/notes/${noteId}/report`, { reason });
    return data;
  },

  async download(noteId: string) {
    const { data } = await api.post<IApiResponse<{ url: string }>>(`/v1/notes/${noteId}/download`, {});
    return data;
  },
};
