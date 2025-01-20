import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProductPrice } from '@prisma/client';

@Injectable()
export class BusinessProductPriceService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessProductPriceCreateInput,
  ): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.create({
      data,
    });
  }

  async findAll(): Promise<BusinessProductPrice[]> {
    return this.prisma.businessProductPrice.findMany();
  }

  async findOne(id: string): Promise<BusinessProductPrice | null> {
    return this.prisma.businessProductPrice.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessProductPriceUpdateInput,
  ): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessProductPrice> {
    return this.prisma.businessProductPrice.delete({
      where: { id },
    });
  }
}
