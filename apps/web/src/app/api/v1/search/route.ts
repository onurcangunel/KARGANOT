import { NextRequest } from 'next/server';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { SearchSchema } from '@/lib/api/schemas/validation';
import { searchNotes } from '@/lib/services/server/search.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parse = SearchSchema.safeParse({
      q: searchParams.get('q') || '',
      universityId: searchParams.get('universityId') || undefined,
      facultyId: searchParams.get('facultyId') || undefined,
      departmentId: searchParams.get('departmentId') || undefined,
      courseId: searchParams.get('courseId') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    });
    if (!parse.success) {
      const fields: Record<string, string> = {};
      parse.error.issues.forEach((i) => (fields[i.path.join('.')] = i.message));
      return ApiErrors.VALIDATION_ERROR(fields);
    }

    const { page, limit, ...rest } = parse.data;
    const { total, notes } = await searchNotes({ page, limit, ...rest });
    return apiSuccess({
      results: notes.map((n) => ({ ...n, tags: n.tags ? JSON.parse(n.tags) : [] })),
      pagination: { page, limit, total },
    });
  } catch (error) {
    console.error('Search error:', error);
    return ApiErrors.INTERNAL_ERROR('Arama yapılırken bir hata oluştu');
  }
}
