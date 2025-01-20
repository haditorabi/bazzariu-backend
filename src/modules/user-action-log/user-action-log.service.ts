import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserActionLog } from '@prisma/client';

@Injectable()
export class UserActionLogService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserActionLogCreateInput): Promise<UserActionLog> {
    return this.prisma.userActionLog.create({
      data,
    });
  }

  async findAll(): Promise<UserActionLog[]> {
    return this.prisma.userActionLog.findMany();
  }

  async findOne(id: string): Promise<UserActionLog | null> {
    return this.prisma.userActionLog.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserActionLogUpdateInput,
  ): Promise<UserActionLog> {
    return this.prisma.userActionLog.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserActionLog> {
    return this.prisma.userActionLog.delete({
      where: { id },
    });
  }
}
