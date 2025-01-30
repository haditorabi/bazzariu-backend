import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserAction } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserActionService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create user action')
  async create(data: Prisma.UserActionCreateInput): Promise<UserAction> {
    return this.prisma.userAction.create({
      data,
    });
  }

  @ServiceErrorHandler('find all user actions')
  async findAll(paginationArgs: PaginationArgs): Promise<UserAction[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userAction.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one user action')
  async findOne(id: string): Promise<UserAction | null> {
    return this.prisma.userAction.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update user action')
  async update(
    id: string,
    data: Prisma.UserActionUpdateInput,
  ): Promise<UserAction> {
    return this.prisma.userAction.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete user action')
  async delete(id: string): Promise<UserAction> {
    return this.prisma.userAction.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('get user by ID')
  async getUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
