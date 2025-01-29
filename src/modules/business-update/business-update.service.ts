import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessUpdate } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessUpdateService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create BusinessUpdate') // Applying error handler decorator
  async create(
    data: Prisma.BusinessUpdateCreateInput,
  ): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.create({
      data,
    });
  }

  @ServiceErrorHandler('findAll BusinessUpdates') // Applying error handler decorator
  async findAll(skip?: number, take?: number): Promise<BusinessUpdate[]> {
    return this.prisma.businessUpdate.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('findOne BusinessUpdate') // Applying error handler decorator
  async findOne(id: string): Promise<BusinessUpdate | null> {
    return this.prisma.businessUpdate.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update BusinessUpdate') // Applying error handler decorator
  async update(
    id: string,
    data: Prisma.BusinessUpdateUpdateInput,
  ): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete BusinessUpdate') // Applying error handler decorator
  async delete(id: string): Promise<BusinessUpdate> {
    return this.prisma.businessUpdate.delete({
      where: { id },
    });
  }

  // New method to retrieve related Business
  @ServiceErrorHandler('get Business') // Applying error handler decorator
  async getBusiness(businessId: string) {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
