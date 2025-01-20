import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessBoost } from '@prisma/client';

@Injectable()
export class BusinessBoostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessBoostCreateInput): Promise<BusinessBoost> {
    return this.prisma.businessBoost.create({
      data,
    });
  }

  async findAll(): Promise<BusinessBoost[]> {
    return this.prisma.businessBoost.findMany();
  }

  async findOne(id: string): Promise<BusinessBoost | null> {
    return this.prisma.businessBoost.findUnique({
      where: { id },
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
    return this.prisma.businessBoost.delete({
      where: { id },
    });
  }
}
