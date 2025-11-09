import prisma from '@/lib/prisma';

export interface SearchParams {
  q: string;
  universityId?: string;
  facultyId?: string;
  departmentId?: string;
  courseId?: string;
  page: number;
  limit: number;
}

export async function searchNotes(params: SearchParams) {
  const { q, universityId, facultyId, departmentId, courseId, page, limit } = params;
  const skip = (page - 1) * limit;
  const where: any = { status: 'APPROVED' };
  where.OR = [
    { title: { contains: q, mode: 'insensitive' } },
    { description: { contains: q, mode: 'insensitive' } },
    { tags: { contains: q, mode: 'insensitive' } },
  ];
  if (universityId) where.universityId = universityId;
  if (courseId) where.courseId = courseId;
  if (departmentId) where.course = { departmentId };
  else if (facultyId) where.course = { department: { facultyId } };

  const [total, notes] = await Promise.all([
    prisma.note.count({ where }),
    prisma.note.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ downloads: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        fileExt: true,
        sizeBytes: true,
        downloads: true,
        views: true,
        avgRating: true,
        createdAt: true,
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
