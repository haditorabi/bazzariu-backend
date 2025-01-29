import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessLocation, Business } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
  async findAll({
    skip = 0,
    take = 10,
  }: { skip?: number; take?: number } = {}): Promise<BusinessLocation[]> {
    return this.prisma.businessLocation.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find Business Location by ID')
  async findOne(id: string): Promise<BusinessLocation | null> {
    return this.prisma.businessLocation.findUnique({
      where: { id },
    });
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
