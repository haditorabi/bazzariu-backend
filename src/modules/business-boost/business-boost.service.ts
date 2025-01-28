import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessBoost, BusinessBoostType } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

@Injectable()
export class BusinessBoostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessBoostCreateInput): Promise<BusinessBoost> {
    return this.prisma.businessBoost.create({
      data,
    });
  }

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
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc', // Optionally, you can order by creation date or any other field
      },
      include: {
        business: true,
      },
    });
  }

  async findOne(id: string): Promise<BusinessBoost | null> {
    return this.prisma.businessBoost.findUnique({
      where: { id, deletedAt: null },
      include: {
        business: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessBoostUpdateInput,
  ): Promise<BusinessBoost> {
    return this.prisma.businessBoost.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessBoost> {
    return this.prisma.businessBoost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getBusiness(businessId: string): Promise<CommonBusiness | null> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
