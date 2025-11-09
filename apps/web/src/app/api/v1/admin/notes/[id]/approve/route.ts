import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

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

    // Not kontrolü
    const note = await prisma.note.findUnique({
      where: { id: noteId }
    });

    if (!note) {
      return ApiErrors.NOT_FOUND('Not');
    }

    // Notu onayla
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        status: 'APPROVED',
        moderationReason: null
      }
    });

    // Audit log oluştur
    await prisma.auditLog.create({
      data: {
        actorUserId: adminId,
        action: 'APPROVE_NOTE',
        entity: 'Note',
        entityId: noteId,
        diff: JSON.stringify({
          before: { status: note.status },
          after: { status: 'APPROVED' }
        })
      }
    });

    // Yükleme yapana +1 download bonusu (max 5)
    const uploader = await prisma.user.findUnique({
      where: { id: note.uploaderId }
    });

    if (uploader && uploader.plan === 'FREE') {
      const currentQuota = uploader.monthlyDownloadQuota;
      const maxBonusQuota = 8; // Base 3 + max 5 bonus
      
      if (currentQuota < maxBonusQuota) {
        await prisma.user.update({
          where: { id: note.uploaderId },
          data: {
            monthlyDownloadQuota: { increment: 1 }
          }
        });
      }
    }

    return apiSuccess({
      note: {
        id: updatedNote.id,
        title: updatedNote.title,
        status: updatedNote.status,
        updatedAt: updatedNote.updatedAt
      },
      message: 'Not onaylandı'
    });

  } catch (error) {
    console.error('Approve note error:', error);
    return ApiErrors.INTERNAL_ERROR('Not onaylanırken hata oluştu');
  }
}
