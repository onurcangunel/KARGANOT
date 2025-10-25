/**
 * 🏫 UNIVERSITIES API
 * 
 * GET /api/universities
 * 
 * Tüm üniversiteleri listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const city = searchParams.get('city') || ''
    const limit = parseInt(searchParams.get('limit') || '1000')

    const universities = await prisma.university.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { slug: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          city ? { city: { contains: city, mode: 'insensitive' } } : {},
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        type: true,
        logo: true,
        _count: {
          select: {
            faculties: true,
            documents: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      universities,
      count: universities.length,
    })
  } catch (error) {
    console.error('❌ GET universities error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}
