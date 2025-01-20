import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Business } from '@prisma/client';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessCreateInput): Promise<Business> {
    return this.prisma.business.create({
      data,
    });
  }

  async findAll(): Promise<Business[]> {
    return this.prisma.business.findMany();
  }

  async findOne(id: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessUpdateInput,
  ): Promise<Business> {
    return this.prisma.business.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Business> {
    return this.prisma.business.delete({
      where: { id },
    });
  }
}
