import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Media } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MediaCreateInput): Promise<Media> {
    return this.prisma.media.create({
      data,
    });
  }

  async findAll(): Promise<Media[]> {
    return this.prisma.media.findMany();
  }

  async findOne(id: string): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.MediaUpdateInput): Promise<Media> {
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Media> {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
