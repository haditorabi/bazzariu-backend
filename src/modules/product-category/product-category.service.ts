import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductCategory } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
  async findAll({
    page = 1,
    limit = 10,
  }: { page?: number; limit?: number } = {}): Promise<ProductCategory[]> {
    const skip = (page - 1) * limit;
    return this.prisma.productCategory.findMany({
      skip,
      take: limit,
    });
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
