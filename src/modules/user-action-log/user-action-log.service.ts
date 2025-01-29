import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserActionLog } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class UserActionLogService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create user action log')
  async create(data: Prisma.UserActionLogCreateInput): Promise<UserActionLog> {
    return this.prisma.userActionLog.create({
      data,
    });
  }

  @ServiceErrorHandler('find all user action logs')
  async findAll(params: {
    skip?: number;
    take?: number;
  }): Promise<UserActionLog[]> {
    const { skip, take } = params;
    return this.prisma.userActionLog.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find user action log')
  async findOne(id: string): Promise<UserActionLog | null> {
    return this.prisma.userActionLog.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update user action log')
  async update(
    id: string,
    data: Prisma.UserActionLogUpdateInput,
  ): Promise<UserActionLog> {
    return this.prisma.userActionLog.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete user action log')
  async delete(id: string): Promise<UserActionLog> {
    return this.prisma.userActionLog.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get user for user action log')
  async getUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
