import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Bölüm var mı kontrol et
    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        faculty: {
          select: {
            id: true,
            name: true,
            slug: true,
            university: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      }
    });

    if (!department) {
      return ApiErrors.NOT_FOUND('Bölüm bulunamadı');
    }

    // Dersleri getir
    const courses = await prisma.course.findMany({
      where: {
        departmentId: id,
        isActive: true
      },
      orderBy: { code: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        semester: true,
        departmentId: true,
        isActive: true,
        _count: {
          select: {
            notes: {
              where: {
                status: 'APPROVED'
              }
            }
          }
        }
      }
    });

    return apiSuccess({
      university: department.faculty.university,
      faculty: {
        id: department.faculty.id,
        name: department.faculty.name,
        slug: department.faculty.slug
      },
      department: {
        id: department.id,
        name: department.name,
        slug: department.slug
      },
      courses: courses.map(course => ({
        ...course,
        noteCount: course._count.notes
      }))
    });

  } catch (error) {
    console.error('Courses list error:', error);
    return ApiErrors.INTERNAL_ERROR('Ders listesi alınırken hata oluştu');
  }
}
