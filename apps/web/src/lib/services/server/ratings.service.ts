import prisma from '@/lib/prisma';

export async function createRating(noteId: string, userId: string, rating: number, comment?: string | null) {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) return { ok: false as const, error: 'NOT_FOUND' };

  const existing = await prisma.rating.findFirst({ where: { noteId, userId } });
  if (existing) return { ok: false as const, error: 'ALREADY_RATED' };

  const newRating = await prisma.rating.create({ data: { noteId, userId, rating, comment: comment ?? null } });
  const ratings = await prisma.rating.findMany({ where: { noteId }, select: { rating: true } });
  const avg = ratings.reduce((s, r) => s + r.rating, 0) / ratings.length;
  await prisma.note.update({ where: { id: noteId }, data: { avgRating: parseFloat(avg.toFixed(2)), ratingCount: ratings.length } });
  return { ok: true as const, data: { id: newRating.id, avgRating: parseFloat(avg.toFixed(2)), ratingCount: ratings.length } };
}
