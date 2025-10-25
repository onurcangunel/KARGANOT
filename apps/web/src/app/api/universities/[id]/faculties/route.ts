/**
 * 🏛️ FACULTIES API
 * 
 * GET /api/universities/[id]/faculties
 * 
 * Belirli bir üniversitenin fakültelerini listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const universityId = params.id

    // Verify university exists
    const university = await prisma.university.findUnique({
      where: { id: universityId },
      select: { id: true, name: true },
    })

    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    const faculties = await prisma.faculty.findMany({
      where: {
        universityId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            departments: true,
            documents: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      university,
      faculties,
      count: faculties.length,
    })
  } catch (error) {
    console.error('❌ GET faculties error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch faculties' },
      { status: 500 }
    )
  }
}
