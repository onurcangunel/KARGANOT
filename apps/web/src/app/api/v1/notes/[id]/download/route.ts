import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { startDownload } from '@/lib/services/server/download.service';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-characters-long'
);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent');
    const result = await startDownload(id, userId, ip, userAgent);
    if (!result.ok) {
      if (result.error === 'NO_USER') return ApiErrors.UNAUTHORIZED('Kullanıcı bulunamadı');
      if (result.error === 'NOT_FOUND') return ApiErrors.NOT_FOUND('Not');
      if (result.error === 'FORBIDDEN') return ApiErrors.FORBIDDEN('Bu not henüz onaylanmadı');
      if (result.error === 'QUOTA') return ApiErrors.QUOTA_EXCEEDED();
      return ApiErrors.INTERNAL_ERROR('İndirme başlatılamadı');
    }

    return apiSuccess({
      url: result.data.url,
      expiresIn: result.data.expiresIn,
      remainingQuota: result.data.remaining,
      message: 'İndirme başlatıldı',
    });
  } catch (error) {
    console.error('Download error:', error);
    return ApiErrors.INTERNAL_ERROR('İndirme başlatılırken hata oluştu');
  }
}
