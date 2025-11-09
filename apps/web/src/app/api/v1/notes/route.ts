import { NextRequest } from 'next/server';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { NoteQuerySchema } from '@/lib/api/schemas/validation';
import { findNotes } from '@/lib/services/server/notes.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parse = NoteQuerySchema.safeParse({
      courseId: searchParams.get('courseId') || undefined,
      status: searchParams.get('status') || 'APPROVED',
      sort: searchParams.get('sort') || 'recent',
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    });
    if (!parse.success) {
      const fields: Record<string, string> = {};
      parse.error.issues.forEach((i) => (fields[i.path.join('.')] = i.message));
      return ApiErrors.VALIDATION_ERROR(fields);
    }

    const { page, limit, sort, ...rest } = parse.data;
    const { total, notes } = await findNotes({ page, limit, sort, ...rest });

    return apiSuccess({
      items: notes.map((note) => ({
        id: note.id,
        title: note.title,
        description: note.description,
        courseId: note.courseId,
        course: note.course,
        uploaderId: note.uploaderId,
        uploader: note.uploader,
        fileExt: note.fileExt,
        sizeBytes: note.sizeBytes,
        pages: note.pages,
        tags: note.tags ? JSON.parse(note.tags) : [],
        downloads: note.downloads,
        views: note.views,
        avgRating: note.avgRating,
        status: note.status,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    console.error('Notes list error:', error);
    return ApiErrors.INTERNAL_ERROR('Not listesi alınırken hata oluştu');
  }
}
