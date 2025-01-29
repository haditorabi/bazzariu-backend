import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessBoost, BusinessBoostType } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessBoostService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Business Boost')
  async create(data: Prisma.BusinessBoostCreateInput): Promise<BusinessBoost> {
    return this.prisma.businessBoost.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All Business Boosts')
  async findAll(args?: {
    skip?: number;
    take?: number;
    type?: BusinessBoostType;
  }): Promise<BusinessBoost[]> {
    const { skip, take, type } = args || {};
    return this.prisma.businessBoost.findMany({
      skip,
      take,
      where: {
        ...(type && { type }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        business: true,
      },
    });
  }

  @ServiceErrorHandler('Find One Business Boost')
  async findOne(id: string): Promise<BusinessBoost | null> {
    return this.prisma.businessBoost.findUnique({
      where: { id },
      include: {
        business: true,
      },
    });
  }

  @ServiceErrorHandler('Update Business Boost')
  async update(
    id: string,
    data: Prisma.BusinessBoostUpdateInput,
  ): Promise<BusinessBoost> {
    return this.prisma.businessBoost.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Business Boost')
  async delete(id: string): Promise<BusinessBoost> {
    return this.prisma.businessBoost.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('Get Business')
  async getBusiness(businessId: string): Promise<CommonBusiness | null> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
