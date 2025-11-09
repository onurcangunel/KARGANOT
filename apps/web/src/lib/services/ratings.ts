import api from '@/utils/api';
import type { IApiResponse } from '@/types/api';

export const ratingsService = {
  async update(reviewId: string, rating: number, comment?: string) {
    const { data } = await api.put<IApiResponse>(`/v1/ratings/${reviewId}`, { rating, comment });
    return data;
  },
  async remove(reviewId: string) {
    const { data } = await api.delete<IApiResponse>(`/v1/ratings/${reviewId}`);
    return data;
  },
};
