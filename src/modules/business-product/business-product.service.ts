import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProduct } from '@prisma/client';

@Injectable()
export class BusinessProductService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessProductCreateInput,
  ): Promise<BusinessProduct> {
    return this.prisma.businessProduct.create({
      data,
    });
  }

  async findAll(): Promise<BusinessProduct[]> {
    return this.prisma.businessProduct.findMany();
  }

  async findOne(id: string): Promise<BusinessProduct | null> {
    return this.prisma.businessProduct.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessProductUpdateInput,
  ): Promise<BusinessProduct> {
    return this.prisma.businessProduct.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessProduct> {
    return this.prisma.businessProduct.delete({
      where: { id },
    });
  }
}
