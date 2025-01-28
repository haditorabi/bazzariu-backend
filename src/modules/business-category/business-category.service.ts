import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessCategory } from '@prisma/client';

@Injectable()
export class BusinessCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessCategoryCreateInput,
  ): Promise<BusinessCategory> {
    return this.prisma.businessCategory.create({
      data,
    });
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<BusinessCategory[]> {
    return this.prisma.businessCategory.findMany({
      where: { deletedAt: null }, // Only return non-deleted records
      skip,
      take,
    });
  }

  async findOne(id: string): Promise<BusinessCategory | null> {
    return this.prisma.businessCategory.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessCategoryUpdateInput,
  ): Promise<BusinessCategory> {
    return this.prisma.businessCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessCategory> {
    return this.prisma.businessCategory.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }
}
