import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Province } from '@prisma/client';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProvinceCreateInput): Promise<Province> {
    return this.prisma.province.create({
      data,
    });
  }

  async findAll(): Promise<Province[]> {
    return this.prisma.province.findMany();
  }

  async findOne(id: string): Promise<Province | null> {
    return this.prisma.province.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.ProvinceUpdateInput,
  ): Promise<Province> {
    return this.prisma.province.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Province> {
    return this.prisma.province.delete({
      where: { id },
    });
  }
}
