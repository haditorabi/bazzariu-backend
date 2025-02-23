import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessTag } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessTag[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessTag.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all business tags')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[BusinessTag[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.businessTag.findMany({
        skip,
        take,
      }),
      this.prisma.businessTag.count(),
    ]);
    return [items, totalCount];
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
