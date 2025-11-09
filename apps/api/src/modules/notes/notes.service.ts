import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.note.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
  }

  async get(id: string) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async create(dto: { title: string; price?: number }) {
    // Minimal create: sadece başlık ve dummy alanlarla
    return this.prisma.note.create({
      data: {
        title: dto.title,
        price: dto.price ?? 0,
        fileKey: 'placeholder',
        fileName: 'placeholder.pdf',
        fileSize: 1,
        fileType: 'application/pdf',
        sellerId: (await this.prisma.user.findFirst())!.id,
        universityId: (await this.prisma.university.findFirst())!.id,
      },
    });
  }
}
