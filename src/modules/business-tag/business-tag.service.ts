import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessTag } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessTagService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create business tag')
  async create(data: Prisma.BusinessTagCreateInput): Promise<BusinessTag> {
    return this.prisma.businessTag.create({
      data,
    });
  }

  @ServiceErrorHandler('find all business tags')
  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<BusinessTag[]> {
    return this.prisma.businessTag.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('find business tag by id')
  async findOne(id: string): Promise<BusinessTag | null> {
    return this.prisma.businessTag.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update business tag')
  async update(
    id: string,
    data: Prisma.BusinessTagUpdateInput,
  ): Promise<BusinessTag> {
    return this.prisma.businessTag.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete business tag')
  async delete(id: string): Promise<BusinessTag> {
    return this.prisma.businessTag.delete({
      where: { id },
    });
  }
}
