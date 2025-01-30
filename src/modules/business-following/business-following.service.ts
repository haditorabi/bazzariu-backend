import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessFollowing } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class BusinessFollowingService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create business following')
  async create(
    data: Prisma.BusinessFollowingCreateInput,
  ): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.create({ data });
  }

  @ServiceErrorHandler('find all business followings')
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessFollowing[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.businessFollowing.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one business following')
  async findOne(id: string): Promise<BusinessFollowing | null> {
    return this.prisma.businessFollowing.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update business following')
  async update(
    id: string,
    data: Prisma.BusinessFollowingUpdateInput,
  ): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete business following')
  async delete(id: string): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.delete({
      where: { id },
    });
  }
}
