import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Üniversite var mı kontrol et
    const university = await prisma.university.findUnique({
      where: { id }
    });

    if (!university) {
      return ApiErrors.NOT_FOUND('Üniversite bulunamadı');
    }

    // Fakülteleri getir
    const faculties = await prisma.faculty.findMany({
      where: {
        universityId: id,
        isActive: true
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        universityId: true,
        isActive: true,
        _count: {
          select: {
            departments: true
          }
        }
      }
    });

    return apiSuccess({
      university: {
        id: university.id,
        name: university.name,
        slug: university.slug
      },
      faculties: faculties.map(faculty => ({
        ...faculty,
        departmentCount: faculty._count.departments
      }))
    });

  } catch (error) {
    console.error('Faculties list error:', error);
    return ApiErrors.INTERNAL_ERROR('Fakülte listesi alınırken hata oluştu');
  }
}
