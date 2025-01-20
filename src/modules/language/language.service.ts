import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Language } from '@prisma/client';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LanguageCreateInput): Promise<Language> {
    return this.prisma.language.create({
      data,
    });
  }

  async findAll(): Promise<Language[]> {
    return this.prisma.language.findMany();
  }

  async findOne(id: string): Promise<Language | null> {
    return this.prisma.language.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.LanguageUpdateInput,
  ): Promise<Language> {
    return this.prisma.language.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Language> {
    return this.prisma.language.delete({
      where: { id },
    });
  }
}
