import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserBookmark } from '@prisma/client';

@Injectable()
export class UserBookmarkService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserBookmarkCreateInput): Promise<UserBookmark> {
    return this.prisma.userBookmark.create({
      data,
    });
  }

  async findAll(): Promise<UserBookmark[]> {
    return this.prisma.userBookmark.findMany();
  }

  async findOne(id: string): Promise<UserBookmark | null> {
    return this.prisma.userBookmark.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserBookmarkUpdateInput,
  ): Promise<UserBookmark> {
    return this.prisma.userBookmark.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserBookmark> {
    return this.prisma.userBookmark.delete({
      where: { id },
    });
  }
}
