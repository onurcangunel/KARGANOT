import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fakülte var mı kontrol et
    const faculty = await prisma.faculty.findUnique({
      where: { id },
      include: {
        university: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    if (!faculty) {
      return ApiErrors.NOT_FOUND('Fakülte bulunamadı');
    }

    // Bölümleri getir
    const departments = await prisma.department.findMany({
      where: {
        facultyId: id,
        isActive: true
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        facultyId: true,
        isActive: true,
        _count: {
          select: {
            courses: true
          }
        }
      }
    });

    return apiSuccess({
      university: faculty.university,
      faculty: {
        id: faculty.id,
        name: faculty.name,
        slug: faculty.slug
      },
      departments: departments.map(dept => ({
        ...dept,
        courseCount: dept._count.courses
      }))
    });

  } catch (error) {
    console.error('Departments list error:', error);
    return ApiErrors.INTERNAL_ERROR('Bölüm listesi alınırken hata oluştu');
  }
}
