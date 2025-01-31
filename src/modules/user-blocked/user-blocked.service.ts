import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserBlocked } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserBlockedService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create user block')
  async create(data: Prisma.UserBlockedCreateInput): Promise<UserBlocked> {
    return this.prisma.userBlocked.create({
      data,
    });
  }

  @ServiceErrorHandler('Find all user blocks')
  async findAll(paginationArgs: PaginationArgs): Promise<UserBlocked[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userBlocked.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find user block by ID')
  async findOne(id: string): Promise<UserBlocked | null> {
    return this.prisma.userBlocked.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update user block')
  async update(
    id: string,
    data: Prisma.UserBlockedUpdateInput,
  ): Promise<UserBlocked> {
    return this.prisma.userBlocked.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete user block')
  async delete(id: string): Promise<UserBlocked> {
    return this.prisma.userBlocked.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('Get User')
  async getUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
