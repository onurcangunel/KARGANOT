import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { CreateReportSchema } from '@/lib/api/schemas/validation';
import { createReport } from '@/lib/services/server/report.service';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-characters-long'
);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: noteId } = params;

    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return ApiErrors.UNAUTHORIZED();
    const token = authHeader.substring(7);
    let userId: string;
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.userId as string;
    } catch {
      return ApiErrors.UNAUTHORIZED('Geçersiz token');
    }

    const body = await req.json();
    // Client may send { reason } alias; normalize to { detail }
    if (body && typeof body.reason === 'string' && !body.detail) {
      body.detail = body.reason;
    }
    const validation = CreateReportSchema.safeParse(body);
    if (!validation.success) {
      const fields: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        fields[String(err.path[0] ?? 'root')] = err.message;
      });
      return ApiErrors.VALIDATION_ERROR(fields);
    }
    const { type, detail } = validation.data;

  const result = await createReport(noteId, userId, type, detail);
    if (!result.ok) {
      if (result.error === 'NOT_FOUND') return ApiErrors.NOT_FOUND('Not');
      if (result.error === 'ALREADY_REPORTED')
        return ApiErrors.VALIDATION_ERROR({ report: 'Bu not için zaten açık bir şikayetiniz var' });
      return ApiErrors.INTERNAL_ERROR('Şikayet kaydedilemedi');
    }

  return apiSuccess({ id: result.data.id, message: 'Şikayetiniz alındı. İnceleme yapılacak.' }, 201);
  } catch (error) {
    console.error('Report error:', error);
    return ApiErrors.INTERNAL_ERROR('Şikayet kaydedilirken hata oluştu');
  }
}
