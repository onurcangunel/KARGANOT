/**
 * YÖK ATLAS - Bölüm Listesi API
 * 
 * GET /api/yok-atlas/departments?unitId=xxx&search=bilgisayar
 * 
 * Belirli bir birimin (fakülte/MYO) bölümlerini listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const unitId = searchParams.get('unitId')
    const search = searchParams.get('search') || ''

    if (!unitId) {
      return NextResponse.json(
        {
          success: false,
          error: 'unitId parameter is required',
        },
        { status: 400 }
      )
    }

    const departments = await prisma.department.findMany({
      where: {
        universityUnitId: unitId,
        isActive: true,
        ...(search
          ? {
              name: { contains: search },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        code: true,
        scoreType: true,
        quota: true,
        yokAtlasId: true,
        _count: {
          select: {
            courses: true,
            documents: true,
          },
        },
      },
      orderBy: [{ name: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      count: departments.length,
      data: departments,
    })
  } catch (error) {
    console.error('❌ Departments API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch departments',
      },
      { status: 500 }
    )
  }
}
