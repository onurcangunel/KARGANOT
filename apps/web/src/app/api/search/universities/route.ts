import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/search/universities?q=muğla
 * 
 * CourseHero tarzı arama:
 * - Hem üniversite adlarında arar
 * - Hem de birim adlarında arar (Fakülte, MYO, Enstitü)
 * 
 * Örnek sonuç:
 * [
 *   {
 *     universityId: "...",
 *     universityName: "Muğla Sıtkı Koçman Üniversitesi",
 *     city: "Muğla",
 *     unitId: "...",
 *     unitName: "Yatağan Meslek Yüksekokulu",
 *     unitType: "VOCATIONAL_SCHOOL"
 *   }
 * ]
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Raw SQL ile hem University hem UniversityUnit tablolarında arama yap
    const results = await prisma.$queryRaw<any[]>`
      SELECT DISTINCT
        u.id as universityId,
        u.name as universityName,
        u.city,
        uu.id as unitId,
        uu.name as unitName,
        uu.type as unitType
      FROM universities u
      LEFT JOIN university_units uu ON u.id = uu."universityId"
      WHERE 
        u.name LIKE ${`%${query}%`}
        OR uu.name LIKE ${`%${query}%`}
      ORDER BY
        CASE
          -- Tam eşleşme öncelikli
          WHEN u.name LIKE ${query} THEN 1
          WHEN uu.name LIKE ${query} THEN 2
          -- Başlangıçta eşleşme
          WHEN u.name LIKE ${`${query}%`} THEN 3
          WHEN uu.name LIKE ${`${query}%`} THEN 4
          -- İçeride eşleşme
          ELSE 5
        END,
        u.name ASC,
        uu.name ASC
      LIMIT 50
    `;

    return NextResponse.json({ results });
  } catch (error) {
    console.error('University search error:', error);
    return NextResponse.json(
      { error: 'Arama sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
