import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessUpdate, Business } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessUpdate[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.businessUpdate.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all BusinessUpdate')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessUpdate[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessUpdate.findMany({
        skip,
        take,
      }),
      this.prisma.businessUpdate.count(),
    ]);
    return [items, totalCount];
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
  async getBusiness(businessId: string): Promise<Business> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }
}
