import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessLocation, Business } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class BusinessLocationService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Business Location')
  async create(
    data: Prisma.BusinessLocationCreateInput,
  ): Promise<BusinessLocation> {
    return this.prisma.businessLocation.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All Business Locations')
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessLocation[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessLocation.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all Business Locations')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessLocation[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessLocation.findMany({
        skip,
        take,
      }),
      this.prisma.businessLocation.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('Find Business Location by ID')
  async findOne(id: string): Promise<BusinessLocation | null> {
    const location = await this.prisma.businessLocation.findUnique({
      where: { id },
    });
    if (!location) {
      throw new Error('Business Location not found');
    }
    return location;
  }

  @ServiceErrorHandler('Update Business Location')
  async update(
    id: string,
    data: Prisma.BusinessLocationUpdateInput,
  ): Promise<BusinessLocation> {
    return this.prisma.businessLocation.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Business Location')
  async delete(id: string): Promise<BusinessLocation> {
    return this.prisma.businessLocation.delete({
      where: { id },
    });
  }

  // Example function to get business related to a BusinessLocation
  @ServiceErrorHandler('Get Business by ID')
  async getBusiness(businessId: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
