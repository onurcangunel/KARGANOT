import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { AdminNotesQuerySchema } from '@/lib/api/schemas/validation';
import { listAdminNotes } from '@/lib/services/server/admin.service';

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

export async function GET(req: NextRequest) {
  try {
    const adminId = await requireAdmin(req);
    if (!adminId) {
      return ApiErrors.FORBIDDEN('Bu işlem için admin veya moderatör yetkisi gerekli');
    }

    const { searchParams } = new URL(req.url);
    const parse = AdminNotesQuerySchema.safeParse({
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    });
    if (!parse.success) {
      const fields: Record<string, string> = {};
      parse.error.issues.forEach((i: { path: (string | number)[]; message: string }) => {
        fields[i.path.join('.')] = i.message;
      });
      return ApiErrors.VALIDATION_ERROR(fields);
    }

    const { page, limit, status } = parse.data;
    const { total, notes } = await listAdminNotes({ page, limit, status });

    return apiSuccess({
      items: notes.map((note) => ({
        id: note.id,
        title: note.title,
        description: note.description,
        uploader: note.uploader,
        course: note.course,
        status: note.status,
        moderationReason: note.moderationReason,
        openReportsCount: (note as any)._count?.reports ?? 0,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })),
      pagination: { page, limit, total },
    });
  } catch (error) {
    console.error('Admin notes list error:', error);
    return ApiErrors.INTERNAL_ERROR('Not listesi alınırken hata oluştu');
  }
}
