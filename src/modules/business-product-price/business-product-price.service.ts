import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProductPrice } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';

@Injectable()
export class BusinessProductPriceService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create BusinessProductPrice')
  async create(
    data: Prisma.BusinessProductPriceCreateInput,
  ): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All BusinessProductPrices')
  async findAll(
    paginationArgs: PaginationArgs,
  ): Promise<BusinessProductPrice[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessProductPrice.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all BusinessProductPrices')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessProductPrice[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessProductPrice.findMany({
        skip,
        take,
      }),
      this.prisma.businessProductPrice.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('Find One BusinessProductPrice')
  async findOne(id: string): Promise<BusinessProductPrice | null> {
    return this.prisma.businessProductPrice.findUnique({
      where: { id },
      include: { businessProduct: true },
    });
  }

  @ServiceErrorHandler('Update BusinessProductPrice')
  async update(
    id: string,
    data: Prisma.BusinessProductPriceUpdateInput,
  ): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete BusinessProductPrice')
  async delete(id: string): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('Get BusinessProduct')
  async getBusinessProduct(
    businessProductId: string,
  ): Promise<CommonBusinessProduct | null> {
    return this.prisma.businessProduct.findUnique({
      where: { id: businessProductId },
    });
  }
}
