import prisma from '@/lib/prisma';

export async function listAdminNotes(params: { status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED'; page: number; limit: number }) {
  const { status, page, limit } = params;
  const skip = (page - 1) * limit;
  const where: any = {};
  if (status) where.status = status;

  const [total, notes] = await Promise.all([
    prisma.note.count({ where }),
    prisma.note.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        uploader: { select: { id: true, name: true, email: true } },
        course: {
          select: {
            name: true,
            code: true,
            department: {
              select: {
                name: true,
                faculty: {
                  select: { name: true, university: { select: { name: true } } },
                },
              },
            },
          },
        },
        _count: {
          select: {
            reports: { where: { status: { in: ['OPEN', 'IN_REVIEW'] } } },
          },
        },
      },
    }),
  ]);

  return { total, notes };
}
