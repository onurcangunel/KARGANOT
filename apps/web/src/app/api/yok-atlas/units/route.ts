/**
 * YÖK ATLAS - Birim (Fakülte/MYO) Listesi API
 * 
 * GET /api/yok-atlas/units?universityId=xxx&search=mühendislik
 * 
 * Belirli bir üniversitenin birimlerini listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const universityId = searchParams.get('universityId')
    const search = searchParams.get('search') || ''

    if (!universityId) {
      return NextResponse.json(
        {
          success: false,
          error: 'universityId parameter is required',
        },
        { status: 400 }
      )
    }

    const units = await prisma.universityUnit.findMany({
      where: {
        universityId,
        isActive: true,
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { shortName: { contains: search } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        shortName: true,
        yokAtlasId: true,
        _count: {
          select: {
            departments: true,
            documents: true,
          },
        },
      },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      count: units.length,
      data: units,
    })
  } catch (error) {
    console.error('❌ Units API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch units',
      },
      { status: 500 }
    )
  }
}
