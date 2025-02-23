import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Business, Prisma, User, UserCheckin } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserCheckinService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create UserCheckin')
  async create(data: Prisma.UserCheckinCreateInput): Promise<UserCheckin> {
    return this.prisma.userCheckin.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All UserCheckins')
  async findAll(paginationArgs: PaginationArgs): Promise<UserCheckin[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userCheckin.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all UserCheckin')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[UserCheckin[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.userCheckin.findMany({
        skip,
        take,
      }),
      this.prisma.userCheckin.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('Find One UserCheckin')
  async findOne(id: string): Promise<UserCheckin | null> {
    return this.prisma.userCheckin.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update UserCheckin')
  async update(
    id: string,
    data: Prisma.UserCheckinUpdateInput,
  ): Promise<UserCheckin> {
    return this.prisma.userCheckin.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete UserCheckin')
  async delete(id: string): Promise<UserCheckin> {
    return this.prisma.userCheckin.delete({
      where: { id },
    });
  }

  // Helper methods for ResolveField
  async findUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findBusiness(businessId: string): Promise<Business> {
    return this.prisma.business.findUnique({ where: { id: businessId } });
  }
}
