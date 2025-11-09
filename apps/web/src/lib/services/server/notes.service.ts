import prisma from '@/lib/prisma';

export interface FindNotesParams {
  courseId?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED';
  page: number;
  limit: number;
  sort: 'recent' | 'popular' | 'rating';
}

export async function findNotes(params: FindNotesParams) {
  const { page, limit, sort } = params;
  const skip = (page - 1) * limit;

  const where: any = { status: params.status ?? 'APPROVED' };
  if (params.courseId) where.courseId = params.courseId;

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'popular') orderBy = { downloads: 'desc' };
  if (sort === 'rating') orderBy = { avgRating: 'desc' };

  const [total, notes] = await Promise.all([
    prisma.note.count({ where }),
    prisma.note.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        uploader: { select: { id: true, name: true } },
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            department: {
              select: {
                id: true,
                name: true,
                faculty: {
                  select: {
                    id: true,
                    name: true,
                    university: { select: { id: true, name: true } },
                  },
                },
              },
            },
          },
        },
      },
    }),
  ]);

  return { total, notes };
}
