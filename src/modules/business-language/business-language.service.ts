import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessLanguage } from '@prisma/client';

@Injectable()
export class BusinessLanguageService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessLanguageCreateInput,
  ): Promise<BusinessLanguage> {
    return this.prisma.businessLanguage.create({
      data,
    });
  }

  async findAll(): Promise<BusinessLanguage[]> {
    return this.prisma.businessLanguage.findMany();
  }

  async findOne(id: string): Promise<BusinessLanguage | null> {
    return this.prisma.businessLanguage.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessLanguageUpdateInput,
  ): Promise<BusinessLanguage> {
    return this.prisma.businessLanguage.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessLanguage> {
    return this.prisma.businessLanguage.delete({
      where: { id },
    });
  }
}
