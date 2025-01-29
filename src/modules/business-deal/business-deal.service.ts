import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  BusinessDeal,
  BusinessProduct,
  Business,
} from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessDealService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Business Deal')
  async create(data: Prisma.BusinessDealCreateInput): Promise<BusinessDeal> {
    return this.prisma.businessDeal.create({
      data,
    });
  }

  @ServiceErrorHandler('Get all Business Deals')
  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<BusinessDeal[]> {
    return this.prisma.businessDeal.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('Get Business Deal by ID')
  async findOne(id: string): Promise<BusinessDeal | null> {
    return this.prisma.businessDeal.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update Business Deal')
  async update(
    id: string,
    data: Prisma.BusinessDealUpdateInput,
  ): Promise<BusinessDeal> {
    return this.prisma.businessDeal.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Business Deal')
  async delete(id: string): Promise<BusinessDeal> {
    return this.prisma.businessDeal.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('Get Business by ID')
  async getBusinessById(id: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Get Business Products')
  async getBusinessProducts(ids: string[]): Promise<BusinessProduct[]> {
    return this.prisma.businessProduct.findMany({
      where: { id: { in: ids } },
    });
  }
}
