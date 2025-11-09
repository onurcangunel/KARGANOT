import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function startDownload(noteId: string, userId: string, ip: string, userAgent: string | null) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false as const, error: 'NO_USER' };
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) return { ok: false as const, error: 'NOT_FOUND' };
  if (note.status !== 'APPROVED') return { ok: false as const, error: 'FORBIDDEN' };

  if (user.plan === 'FREE' && user.monthlyDownloadUsed >= user.monthlyDownloadQuota) {
    return { ok: false as const, error: 'QUOTA' };
  }

  const ipHash = crypto.createHash('sha256').update(ip || 'unknown').digest('hex');
  await prisma.download.create({ data: { noteId, userId, ipHash, userAgent: userAgent || 'unknown' } });
  await prisma.note.update({ where: { id: noteId }, data: { downloads: { increment: 1 } } });
  if (user.plan === 'FREE') {
    await prisma.user.update({ where: { id: userId }, data: { monthlyDownloadUsed: { increment: 1 } } });
  }
  const url = `https://your-bucket.s3.amazonaws.com/${note.fileKey}?X-Amz-Signature=...`;
  const remaining = user.plan === 'FREE' ? user.monthlyDownloadQuota - user.monthlyDownloadUsed - 1 : -1;
  return { ok: true as const, data: { url, expiresIn: 300, remaining } };
}
