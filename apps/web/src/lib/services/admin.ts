import api from '@/utils/api';
import type { IApiResponse, INote, IPagination } from '@/types/api';

export const adminService = {
  async listNotes(params?: { status?: 'PENDING' | 'APPROVED' | 'REJECTED'; page?: number; limit?: number }) {
    const { data } = await api.get<IApiResponse<{ items: INote[]; pagination: IPagination }>>('/v1/admin/notes', { params });
    return data;
  },
  async approveNote(id: string) {
    const { data } = await api.post<IApiResponse<INote>>(`/v1/admin/notes/${id}/approve`, {});
    return data;
  },
  async rejectNote(id: string, reason: string) {
    const { data } = await api.post<IApiResponse<INote>>(`/v1/admin/notes/${id}/reject`, { reason });
    return data;
  },
};
