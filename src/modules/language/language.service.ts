import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Language } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create language')
  async create(data: Prisma.LanguageCreateInput): Promise<Language> {
    return this.prisma.language.create({
      data,
    });
  }

  @ServiceErrorHandler('find all languages')
  async findAll(page: number = 1, pageSize: number = 10): Promise<Language[]> {
    const skip = (page - 1) * pageSize;

    return this.prisma.language.findMany({
      skip,
      take: pageSize,
    });
  }

  @ServiceErrorHandler('find language by id')
  async findOne(id: string): Promise<Language | null> {
    return this.prisma.language.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update language')
  async update(
    id: string,
    data: Prisma.LanguageUpdateInput,
  ): Promise<Language> {
    return this.prisma.language.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete language')
  async delete(id: string): Promise<Language> {
    return this.prisma.language.delete({
      where: { id },
    });
  }
}
