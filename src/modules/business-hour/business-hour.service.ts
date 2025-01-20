import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessHour } from '@prisma/client';

@Injectable()
export class BusinessHourService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessHourCreateInput): Promise<BusinessHour> {
    return this.prisma.businessHour.create({
      data,
    });
  }

  async findAll(): Promise<BusinessHour[]> {
    return this.prisma.businessHour.findMany();
  }

  async findOne(id: string): Promise<BusinessHour | null> {
    return this.prisma.businessHour.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessHourUpdateInput,
  ): Promise<BusinessHour> {
    return this.prisma.businessHour.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessHour> {
    return this.prisma.businessHour.delete({
      where: { id },
    });
  }
}
