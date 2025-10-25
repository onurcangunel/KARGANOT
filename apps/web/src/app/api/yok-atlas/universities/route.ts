/**
 * YÖK ATLAS - Üniversite Listesi API
 * 
 * GET /api/yok-atlas/universities?search=muğla
 * 
 * Tüm üniversiteleri listeler (search parametresi ile filtreleme yapılabilir)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''

    const universities = await prisma.university.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { city: { contains: search } },
            ],
          }
        : { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        type: true,
        logo: true,
        yokAtlasId: true,
        _count: {
          select: {
            units: true,
            documents: true,
          },
        },
      },
      orderBy: [{ name: 'asc' }],
      take: 100, // Limit
    })

    return NextResponse.json({
      success: true,
      count: universities.length,
      data: universities,
    })
  } catch (error) {
    console.error('❌ Universities API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch universities',
      },
      { status: 500 }
    )
  }
}
