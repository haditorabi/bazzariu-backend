import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProductPrice, BusinessProduct } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
  ): Promise<BusinessProduct | null> {
    return this.prisma.businessProduct.findUnique({
      where: { id: businessProductId },
    });
  }
}
