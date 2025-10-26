/**
export const dynamic = 'force-dynamic';
 * YÖK ATLAS - Genel Arama API
 * 
 * GET /api/yok-atlas/search?q=muğla+yatağan
 * 
 * Üniversite, birim ve bölüm arasında kapsamlı arama
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    if (query.length < 2) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: {
          universities: [],
          units: [],
          departments: [],
        },
      })
    }

    // Paralel arama (hepsi aynı anda çalışsın)
    const [universities, units, departments] = await Promise.all([
      // 1. Üniversitelerde ara
      prisma.university.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { city: { contains: query } },
          ],
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          type: true,
          _count: {
            select: { units: true },
          },
        },
        take: 10,
        orderBy: { name: 'asc' },
      }),

      // 2. Birimlerde ara
      prisma.universityUnit.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { shortName: { contains: query } },
          ],
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          shortName: true,
          university: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
          _count: {
            select: { departments: true },
          },
        },
        take: 20,
        orderBy: { name: 'asc' },
      }),

      // 3. Bölümlerde ara
      prisma.department.findMany({
        where: {
          name: { contains: query },
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          code: true,
          scoreType: true,
          quota: true,
          universityUnit: {
            select: {
              id: true,
              name: true,
              type: true,
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
        take: 30,
        orderBy: { name: 'asc' },
      }),
    ])

    return NextResponse.json({
      success: true,
      count: universities.length + units.length + departments.length,
      data: {
        universities,
        units,
        departments,
      },
    })
  } catch (error) {
    console.error('❌ Search API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed',
      },
      { status: 500 }
    )
  }
}
