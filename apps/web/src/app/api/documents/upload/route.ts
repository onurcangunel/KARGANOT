/**
 * 📤 DOCUMENT UPLOAD API
 * 
 * POST /api/documents/upload
 * 
 * Multipart form-data ile dosya yükleme
 * - File validation (type, size)
 * - Local storage
 * - Database record creation
 * - Thumbnail generation (TODO)
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Dosya boyutu limiti (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB in bytes

// İzin verilen dosya tipleri
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'image/jpeg',
  'image/png',
  'image/jpg',
]

// Dosya uzantısı mapping
const FILE_EXTENSIONS: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/jpg': 'jpg',
}

/**
 * Güvenli dosya adı oluştur
 */
function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/--+/g, '-')
    .substring(0, 100)
}

/**
 * Unique dosya adı oluştur
 */
function generateFileName(originalName: string, fileType: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = FILE_EXTENSIONS[fileType] || 'bin'
  const sanitized = sanitizeFileName(originalName.replace(/\.[^/.]+$/, ''))
  
  return `${timestamp}-${random}-${sanitized}.${extension}`
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication check
    const session = await auth()
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      )
    }

    // 2. Parse form data
    const formData = await request.formData()
    
    // Get file
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı. Lütfen bir dosya seçin.' },
        { status: 400 }
      )
    }

    // 3. Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Geçersiz dosya tipi. İzin verilen: PDF, DOCX, PPTX, JPG, PNG',
          receivedType: file.type
        },
        { status: 400 }
      )
    }

    // 4. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          error: `Dosya çok büyük. Maksimum: 50MB`,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        },
        { status: 400 }
      )
    }

    // 5. Get form fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const universityId = formData.get('universityId') as string
    const facultyId = formData.get('facultyId') as string | null
    const departmentId = formData.get('departmentId') as string | null
    const courseId = formData.get('courseId') as string | null
    const documentType = formData.get('documentType') as string
    const semester = formData.get('semester') as string | null
    const academicYear = formData.get('academicYear') as string | null
    const tags = formData.get('tags') as string | null // JSON string

    // 6. Validate required fields
    if (!title || title.trim().length < 10) {
      return NextResponse.json(
        { error: 'Başlık en az 10 karakter olmalıdır.' },
        { status: 400 }
      )
    }

    if (!universityId) {
      return NextResponse.json(
        { error: 'Üniversite seçimi zorunludur.' },
        { status: 400 }
      )
    }

    if (!documentType) {
      return NextResponse.json(
        { error: 'Döküman tipi seçimi zorunludur.' },
        { status: 400 }
      )
    }

    // 7. Verify university exists
    const university = await prisma.university.findUnique({
      where: { id: universityId }
    })

    if (!university) {
      return NextResponse.json(
        { error: 'Geçersiz üniversite seçimi.' },
        { status: 400 }
      )
    }

    // 8. Save file to disk
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    
    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const fileName = generateFileName(file.name, file.type)
    const filePath = join(uploadDir, fileName)

    // Convert File to Buffer and write
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 9. Create database record
    const document = await prisma.document.create({
      data: {
        userId: session.user.id,
        title: title.trim(),
        description: description?.trim() || null,
        fileName: file.name,
        fileUrl: `/uploads/${fileName}`,
        fileSize: file.size,
        fileType: FILE_EXTENSIONS[file.type] || 'unknown',
        universityId,
        facultyId: facultyId || null,
        departmentId: departmentId || null,
        courseId: courseId || null,
        documentType: documentType as any,
        semester: semester || null,
        academicYear: academicYear || null,
        tags: tags || '[]',
        status: 'PENDING', // Moderasyon bekliyor
      },
      include: {
        university: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        },
        faculty: {
          select: {
            id: true,
            name: true,
          }
        },
        department: {
          select: {
            id: true,
            name: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    // 10. Success response
    return NextResponse.json({
      success: true,
      message: 'Dosya başarıyla yüklendi! Moderasyon sonrası yayınlanacaktır.',
      document: {
        id: document.id,
        title: document.title,
        fileUrl: document.fileUrl,
        fileSize: document.fileSize,
        status: document.status,
        createdAt: document.createdAt,
        university: document.university,
        faculty: document.faculty,
        department: document.department,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Upload error:', error)
    
    return NextResponse.json(
      { 
        error: 'Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET: List user's uploads (optional)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        university: {
          select: {
            name: true,
            slug: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json({
      success: true,
      documents,
      count: documents.length
    })

  } catch (error) {
    console.error('❌ GET documents error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
