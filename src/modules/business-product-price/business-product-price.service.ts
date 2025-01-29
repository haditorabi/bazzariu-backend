import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProductPrice } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
    page: number,
    pageSize: number,
  ): Promise<BusinessProductPrice[]> {
    return this.prisma.businessProductPrice.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
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
}
