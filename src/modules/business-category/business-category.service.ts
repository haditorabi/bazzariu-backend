import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessCategory } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessCategory[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessCategory.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all Business Categories')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessCategory[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessCategory.findMany({
        skip,
        take,
      }),
      this.prisma.businessCategory.count(),
    ]);
    return [items, totalCount];
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
