import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductCategory } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.ProductCategoryCreateInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data,
    });
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany();
  }

  async findOne(id: string): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.ProductCategoryUpdateInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<ProductCategory> {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }
}
