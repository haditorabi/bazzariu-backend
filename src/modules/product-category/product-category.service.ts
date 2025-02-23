import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductCategory } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create ProductCategory')
  async create(
    data: Prisma.ProductCategoryCreateInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data,
    });
  }

  @ServiceErrorHandler('find all ProductCategories')
  async findAll(paginationArgs: PaginationArgs): Promise<ProductCategory[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.productCategory.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all ProductCategory')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[ProductCategory[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.productCategory.findMany({
        skip,
        take,
      }),
      this.prisma.productCategory.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('find one ProductCategory')
  async findOne(id: string): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update ProductCategory')
  async update(
    id: string,
    data: Prisma.ProductCategoryUpdateInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete ProductCategory')
  async delete(id: string): Promise<ProductCategory> {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get BusinessProducts by category')
  async getBusinessProductsByCategory(productCategoryId: string) {
    return this.prisma.businessProduct.findMany({
      where: { productCategoryId },
    });
  }
}
