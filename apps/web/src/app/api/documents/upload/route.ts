/**
 * 📤 DOCUMENT UPLOAD API
 * POST /api/documents/upload
 * Multipart form-data ile dosya yükleme (lokal storage) ve Note oluşturma
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// 50MB limit
const MAX_FILE_SIZE = 50 * 1024 * 1024

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png',
  'image/jpg',
]

const FILE_EXTENSIONS: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/jpg': 'jpg',
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/--+/g, '-')
    .substring(0, 100)
}

function generateFileName(originalName: string, fileType: string): string {
  const ts = Date.now()
  const rnd = Math.random().toString(36).slice(2, 8)
  const ext = FILE_EXTENSIONS[fileType] || 'bin'
  const base = sanitizeFileName(originalName.replace(/\.[^/.]+$/, ''))
  return `${ts}-${rnd}-${base}.${ext}`
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı. Lütfen bir dosya seçin.' }, { status: 400 })
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Geçersiz dosya tipi. İzin verilen: PDF, DOCX, PPTX, JPG, PNG', receivedType: file.type },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Dosya çok büyük. Maksimum: 50MB', fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
        { status: 400 }
      )
    }

    const title = formData.get('title') as string
    const description = (formData.get('description') as string | null) || null
    const universityId = formData.get('universityId') as string
    const courseId = (formData.get('courseId') as string | null) || null
    const tags = (formData.get('tags') as string | null) || '[]'

    if (!title || title.trim().length < 10) {
      return NextResponse.json({ error: 'Başlık en az 10 karakter olmalıdır.' }, { status: 400 })
    }
    if (!universityId) {
      return NextResponse.json({ error: 'Üniversite seçimi zorunludur.' }, { status: 400 })
    }
    if (!courseId) {
      return NextResponse.json({ error: 'Ders seçimi zorunludur.' }, { status: 400 })
    }

    const university = await prisma.university.findUnique({ where: { id: universityId } })
    if (!university) {
      return NextResponse.json({ error: 'Geçersiz üniversite seçimi.' }, { status: 400 })
    }

    // Persist file
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }
    const fileName = generateFileName(file.name, file.type)
    const filePath = join(uploadDir, fileName)
    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    // Create Note record
    const created = await prisma.note.create({
      data: {
        uploaderId: auth.user.id,
        title: title.trim(),
        description: description?.trim() || null,
        universityId,
        courseId,
        tags,
        fileKey: `/uploads/${fileName}`,
        fileExt: FILE_EXTENSIONS[file.type] || 'unknown',
        sizeBytes: file.size,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Dosya başarıyla yüklendi! Moderasyon sonrası yayınlanacaktır.',
        document: { id: created.id },
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notes = await prisma.note.findMany({
      where: { uploaderId: auth.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        title: true,
        fileKey: true,
        sizeBytes: true,
        status: true,
        createdAt: true,
        university: { select: { name: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, documents: notes, count: notes.length })
  } catch (error) {
    console.error('❌ GET documents error:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}
