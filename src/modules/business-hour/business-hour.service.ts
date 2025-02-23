import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessHour, Business } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessHour[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessHour.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all BusinessHours')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessHour[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessHour.findMany({
        skip,
        take,
      }),
      this.prisma.businessHour.count(),
    ]);
    return [items, totalCount];
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

  @ServiceErrorHandler('Get Business')
  async getBusiness(businessId: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
