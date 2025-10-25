/**
 * 📖 COURSES API
 * 
 * GET /api/departments/[id]/courses
 * 
 * Belirli bir bölümün derslerini listeler
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const departmentId = params.id

    // Verify department exists
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      select: { 
        id: true, 
        name: true,
        faculty: {
          select: {
            id: true,
            name: true,
            university: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      },
    })

    if (!department) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      )
    }

    const courses = await prisma.course.findMany({
      where: {
        departmentId,
      },
      select: {
        id: true,
        name: true,
        code: true,
        slug: true,
        credits: true,
        _count: {
          select: {
            documents: true,
          },
        },
      },
      orderBy: {
        code: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      department,
      courses,
      count: courses.length,
    })
  } catch (error) {
    console.error('❌ GET courses error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}
