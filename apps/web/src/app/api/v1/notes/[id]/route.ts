import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Notu getir
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            createdAt: true
          }
        },
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            department: {
              select: {
                id: true,
                name: true,
                faculty: {
                  select: {
                    id: true,
                    name: true,
                    university: {
                      select: {
                        id: true,
                        name: true
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ratings: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true
              }
            },
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    });

    if (!note) {
      return ApiErrors.NOT_FOUND('Not');
    }

    // View sayısını artır
    await prisma.note.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    // S3 Preview URL (şimdilik placeholder)
    const previewUrl = note.previewKey 
      ? `https://your-bucket.s3.amazonaws.com/${note.previewKey}`
      : null;

    return apiSuccess({
      note: {
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
        views: note.views + 1, // Güncel view sayısı
        avgRating: note.avgRating,
        status: note.status,
        previewUrl,
        ratings: note.ratings.map(r => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          userName: r.user.name,
          createdAt: r.createdAt
        })),
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }
    });

  } catch (error) {
    console.error('Note detail error:', error);
    return ApiErrors.INTERNAL_ERROR('Not detayı alınırken hata oluştu');
  }
}
