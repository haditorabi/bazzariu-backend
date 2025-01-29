import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessCategory } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessCategoryService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Business Category')
  async create(
    data: Prisma.BusinessCategoryCreateInput,
  ): Promise<BusinessCategory> {
    return this.prisma.businessCategory.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All Business Categories')
  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<BusinessCategory[]> {
    return this.prisma.businessCategory.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find One Business Category')
  async findOne(id: string): Promise<BusinessCategory | null> {
    return this.prisma.businessCategory.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update Business Category')
  async update(
    id: string,
    data: Prisma.BusinessCategoryUpdateInput,
  ): Promise<BusinessCategory> {
    return this.prisma.businessCategory.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Business Category')
  async delete(id: string): Promise<BusinessCategory> {
    return this.prisma.businessCategory.delete({
      where: { id },
    });
  }
}
