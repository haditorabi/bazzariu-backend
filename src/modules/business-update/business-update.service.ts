import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessUpdate } from '@prisma/client';

@Injectable()
export class BusinessUpdateService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessUpdateCreateInput,
  ): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.create({
      data,
    });
  }

  async findAll(): Promise<BusinessUpdate[]> {
    return this.prisma.businessUpdate.findMany();
  }

  async findOne(id: string): Promise<BusinessUpdate | null> {
    return this.prisma.businessUpdate.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessUpdateUpdateInput,
  ): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.delete({
      where: { id },
    });
  }
}
