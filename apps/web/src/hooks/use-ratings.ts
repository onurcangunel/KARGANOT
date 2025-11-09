import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingsService } from '@/lib/services/ratings';
import toast from 'react-hot-toast';

export function useUpdateRating() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rating, comment }: { id: string; rating: number; comment?: string }) => ratingsService.update(id, rating, comment),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success('Yorum güncellendi');
        qc.invalidateQueries();
      } else toast.error(res.error.message);
    },
    onError: () => toast.error('Yorum güncellenemedi'),
  });
}

export function useDeleteRating() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ratingsService.remove(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success('Yorum silindi');
        qc.invalidateQueries();
      } else toast.error(res.error.message);
    },
    onError: () => toast.error('Yorum silinemedi'),
  });
}
