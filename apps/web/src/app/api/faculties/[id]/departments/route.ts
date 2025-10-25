/**
 * 📚 DEPARTMENTS API
 * 
 * GET /api/faculties/[id]/departments
 * 
 * Belirli bir fakültenin bölümlerini listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const facultyId = params.id

    // Verify faculty exists
    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyId },
      select: { 
        id: true, 
        name: true,
        university: {
          select: {
            id: true,
            name: true,
          }
        }
      },
    })

    if (!faculty) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      )
    }

    const departments = await prisma.department.findMany({
      where: {
        facultyId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            courses: true,
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
      faculty,
      departments,
      count: departments.length,
    })
  } catch (error) {
    console.error('❌ GET departments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}
