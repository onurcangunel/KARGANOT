import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { RejectNoteSchema } from '@/lib/api/schemas/validation';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-characters-long'
);

async function requireAdmin(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;
    const role = payload.role as string;

    if (role !== 'ADMIN' && role !== 'MODERATOR') {
      return null;
    }

    return userId;
  } catch {
    return null;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: noteId } = params;

    // Admin kontrolü
    const adminId = await requireAdmin(req);
    if (!adminId) {
      return ApiErrors.FORBIDDEN('Bu işlem için admin veya moderatör yetkisi gerekli');
    }

    // Body validation
    const body = await req.json();
    const validation = RejectNoteSchema.safeParse(body);

    if (!validation.success) {
      const fields: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        fields[err.path[0]] = err.message;
      });
      return ApiErrors.VALIDATION_ERROR(fields);
    }

    const { reason } = validation.data;

    // Not kontrolü
    const note = await prisma.note.findUnique({
      where: { id: noteId }
    });

    if (!note) {
      return ApiErrors.NOT_FOUND('Not');
    }

    // Notu reddet
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        status: 'REJECTED',
        moderationReason: reason
      }
    });

    // Audit log oluştur
    await prisma.auditLog.create({
      data: {
        actorUserId: adminId,
        action: 'REJECT_NOTE',
        entity: 'Note',
        entityId: noteId,
        diff: JSON.stringify({
          before: { status: note.status },
          after: { status: 'REJECTED', reason }
        })
      }
    });

    return apiSuccess({
      note: {
        id: updatedNote.id,
        title: updatedNote.title,
        status: updatedNote.status,
        moderationReason: updatedNote.moderationReason,
        updatedAt: updatedNote.updatedAt
      },
      message: 'Not reddedildi'
    });

  } catch (error) {
    console.error('Reject note error:', error);
    return ApiErrors.INTERNAL_ERROR('Not reddedilirken hata oluştu');
  }
}
