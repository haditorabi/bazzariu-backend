import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessHour } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessHourService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create BusinessHour')
  async create(data: Prisma.BusinessHourCreateInput): Promise<BusinessHour> {
    return this.prisma.businessHour.create({
      data,
    });
  }

  @ServiceErrorHandler('findAll BusinessHours')
  async findAll(page: number, limit: number): Promise<BusinessHour[]> {
    return this.prisma.businessHour.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('findOne BusinessHour')
  async findOne(id: string): Promise<BusinessHour | null> {
    return this.prisma.businessHour.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update BusinessHour')
  async update(
    id: string,
    data: Prisma.BusinessHourUpdateInput,
  ): Promise<BusinessHour> {
    return this.prisma.businessHour.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete BusinessHour')
  async delete(id: string): Promise<BusinessHour> {
    return this.prisma.businessHour.delete({
      where: { id },
    });
  }
}
