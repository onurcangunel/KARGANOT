import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { CreateRatingSchema } from '@/lib/api/schemas/validation';
import { createRating } from '@/lib/services/server/ratings.service';

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
    const validation = CreateRatingSchema.safeParse(body);
    if (!validation.success) {
      const fields: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        fields[String(err.path[0] ?? 'root')] = err.message;
      });
      return ApiErrors.VALIDATION_ERROR(fields);
    }
    const { rating, comment } = validation.data;

    const result = await createRating(noteId, userId, rating, comment);
    if (!result.ok) {
      if (result.error === 'NOT_FOUND') return ApiErrors.NOT_FOUND('Not');
      if (result.error === 'ALREADY_RATED')
        return ApiErrors.VALIDATION_ERROR({ rating: 'Bu not için zaten değerlendirme yaptınız' });
      return ApiErrors.INTERNAL_ERROR('Değerlendirme kaydedilemedi');
    }

    return apiSuccess(
      {
        noteAvgRating: result.data.avgRating,
        noteRatingCount: result.data.ratingCount,
        message: 'Değerlendirme kaydedildi',
      },
      201
    );
  } catch (error) {
    console.error('Rating error:', error);
    return ApiErrors.INTERNAL_ERROR('Değerlendirme kaydedilirken hata oluştu');
  }
}
