import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    const type = searchParams.get('type') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    
    const skip = (page - 1) * limit;

    // Where koşulları
    const where: any = {
      isActive: true
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (city) {
      where.city = city;
    }

    if (type && (type === 'state' || type === 'foundation')) {
      where.type = type;
    }

    // Toplam sayı
    const total = await prisma.university.count({ where });

    // Üniversiteleri getir
    const universities = await prisma.university.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        type: true,
        isActive: true,
        _count: {
          select: {
            faculties: true
          }
        }
      }
    });

    return apiSuccess({
      universities: universities.map(uni => ({
        ...uni,
        facultyCount: uni._count.faculties
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Universities list error:', error);
    return ApiErrors.INTERNAL_ERROR('Üniversite listesi alınırken hata oluştu');
  }
}
