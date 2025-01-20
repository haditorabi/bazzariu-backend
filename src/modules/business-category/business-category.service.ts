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

  async findAll(): Promise<BusinessCategory[]> {
    return this.prisma.businessCategory.findMany();
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
    return this.prisma.businessCategory.delete({
      where: { id },
    });
  }
}
