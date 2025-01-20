import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessLocation } from '@prisma/client';

@Injectable()
export class BusinessLocationService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessLocationCreateInput,
  ): Promise<BusinessLocation> {
    return this.prisma.businessLocation.create({
      data,
    });
  }

  async findAll(): Promise<BusinessLocation[]> {
    return this.prisma.businessLocation.findMany();
  }

  async findOne(id: string): Promise<BusinessLocation | null> {
    return this.prisma.businessLocation.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessLocationUpdateInput,
  ): Promise<BusinessLocation> {
    return this.prisma.businessLocation.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessLocation> {
    return this.prisma.businessLocation.delete({
      where: { id },
    });
  }
}
