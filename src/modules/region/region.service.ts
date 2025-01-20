import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Region } from '@prisma/client';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RegionCreateInput): Promise<Region> {
    return this.prisma.region.create({
      data,
    });
  }

  async findAll(): Promise<Region[]> {
    return this.prisma.region.findMany();
  }

  async findOne(id: string): Promise<Region | null> {
    return this.prisma.region.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.RegionUpdateInput): Promise<Region> {
    return this.prisma.region.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Region> {
    return this.prisma.region.delete({
      where: { id },
    });
  }
}
