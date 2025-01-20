import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, DealsRedemption } from '@prisma/client';

@Injectable()
export class DealsRedemptionService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.DealsRedemptionCreateInput,
  ): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.create({
      data,
    });
  }

  async findAll(): Promise<DealsRedemption[]> {
    return this.prisma.dealsRedemption.findMany();
  }

  async findOne(id: string): Promise<DealsRedemption | null> {
    return this.prisma.dealsRedemption.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.DealsRedemptionUpdateInput,
  ): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.delete({
      where: { id },
    });
  }
}
