import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserBlocked } from '@prisma/client';

@Injectable()
export class UserBlockedService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserBlockedCreateInput): Promise<UserBlocked> {
    return this.prisma.userBlocked.create({
      data,
    });
  }

  async findAll(): Promise<UserBlocked[]> {
    return this.prisma.userBlocked.findMany();
  }

  async findOne(id: string): Promise<UserBlocked | null> {
    return this.prisma.userBlocked.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserBlockedUpdateInput,
  ): Promise<UserBlocked> {
    return this.prisma.userBlocked.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserBlocked> {
    return this.prisma.userBlocked.delete({
      where: { id },
    });
  }
}
