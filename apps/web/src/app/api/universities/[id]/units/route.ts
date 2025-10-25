import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/universities/[id]/units
 * 
 * Belirli bir üniversitenin tüm birimlerini döner
 * (Fakülteler, MYO'lar, Enstitüler, Yüksekokullar, vb.)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const universityId = params.id;

    const units = await prisma.universityUnit.findMany({
      where: {
        universityId,
      },
      include: {
        _count: {
          select: {
            departments: true,
            documents: true,
          },
        },
      },
      orderBy: [
        { type: 'asc' }, // Fakülteler önce, sonra MYO, sonra Enstitüler
        { name: 'asc' },
      ],
    });

    // Türkçe label'lar ekle
    const unitsWithLabels = units.map((unit) => ({
      ...unit,
      typeLabel: getUnitTypeLabel(unit.type),
    }));

    return NextResponse.json({ units: unitsWithLabels });
  } catch (error) {
    console.error('Get university units error:', error);
    return NextResponse.json(
      { error: 'Birimler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

function getUnitTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    FACULTY: 'Fakülte',
    VOCATIONAL_SCHOOL: 'Meslek Yüksekokulu',
    GRADUATE_SCHOOL: 'Enstitü',
    COLLEGE: 'Yüksekokul',
    CONSERVATORY: 'Konservatuar',
    RESEARCH_CENTER: 'Araştırma Merkezi',
    APPLICATION_CENTER: 'Uygulama Merkezi',
    OTHER: 'Diğer',
  };
  return labels[type] || type;
}
