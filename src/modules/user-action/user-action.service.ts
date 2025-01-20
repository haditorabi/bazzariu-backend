import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserAction } from '@prisma/client';

@Injectable()
export class UserActionService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserActionCreateInput): Promise<UserAction> {
    return this.prisma.userAction.create({
      data,
    });
  }

  async findAll(): Promise<UserAction[]> {
    return this.prisma.userAction.findMany();
  }

  async findOne(id: string): Promise<UserAction | null> {
    return this.prisma.userAction.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserActionUpdateInput,
  ): Promise<UserAction> {
    return this.prisma.userAction.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserAction> {
    return this.prisma.userAction.delete({
      where: { id },
    });
  }
}
