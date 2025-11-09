import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/lib/services/admin';
import type { INote } from '@/types/api';
import toast from 'react-hot-toast';

export function useAdminNotes(status: 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING') {
  return useQuery({
    queryKey: ['admin-notes', status],
    queryFn: () => adminService.listNotes({ status }),
    select: (res) => (res.ok ? res.data.items : [] as INote[]),
  });
}

export function useApproveNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.approveNote(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success('Not onaylandı');
        qc.invalidateQueries({ queryKey: ['admin-notes'] });
      } else toast.error(res.error.message);
    },
    onError: () => toast.error('Onaylanamadı'),
  });
}

export function useRejectNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => adminService.rejectNote(id, reason),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success('Not reddedildi');
        qc.invalidateQueries({ queryKey: ['admin-notes'] });
      } else toast.error(res.error.message);
    },
    onError: () => toast.error('Reddetme başarısız'),
  });
}
