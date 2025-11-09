import prisma from '@/lib/prisma';

export async function createReport(noteId: string, userId: string, type: string, detail: string) {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) return { ok: false as const, error: 'NOT_FOUND' };
  const existing = await prisma.report.findFirst({ where: { noteId, reporterId: userId, status: { in: ['OPEN', 'IN_REVIEW'] } } });
  if (existing) return { ok: false as const, error: 'ALREADY_REPORTED' };
  const report = await prisma.report.create({ data: { noteId, reporterId: userId, type: type as any, detail, status: 'OPEN' } });
  const count = await prisma.report.count({ where: { noteId, status: { in: ['OPEN', 'IN_REVIEW'] } } });
  if (count >= 3 && note.status === 'APPROVED') {
    await prisma.note.update({ where: { id: noteId }, data: { status: 'PENDING', moderationReason: `${count} şikayet nedeniyle otomatik inceleme` } });
  }
  return { ok: true as const, data: { id: report.id } };
}
