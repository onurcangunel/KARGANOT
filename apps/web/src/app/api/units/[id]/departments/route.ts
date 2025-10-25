import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/units/[id]/departments
 * 
 * Belirli bir birimin (Fakülte, MYO, Enstitü) tüm bölümlerini döner
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const unitId = params.id;

    const departments = await prisma.department.findMany({
      where: {
        universityUnitId: unitId,
      },
      include: {
        _count: {
          select: {
            courses: true,
            documents: true,
          },
        },
        universityUnit: {
          include: {
            university: {
              select: {
                id: true,
                name: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ departments });
  } catch (error) {
    console.error('Get unit departments error:', error);
    return NextResponse.json(
      { error: 'Bölümler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
