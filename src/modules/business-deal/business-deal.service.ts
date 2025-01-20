import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessDeal } from '@prisma/client';

@Injectable()
export class BusinessDealService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessDealCreateInput): Promise<BusinessDeal> {
    return this.prisma.businessDeal.create({
      data,
    });
  }

  async findAll(): Promise<BusinessDeal[]> {
    return this.prisma.businessDeal.findMany();
  }

  async findOne(id: string): Promise<BusinessDeal | null> {
    return this.prisma.businessDeal.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessDealUpdateInput,
  ): Promise<BusinessDeal> {
    return this.prisma.businessDeal.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessDeal> {
    return this.prisma.businessDeal.delete({
      where: { id },
    });
  }
}
