import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserCheckin } from '@prisma/client';

@Injectable()
export class UserCheckinService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCheckinCreateInput): Promise<UserCheckin> {
    return this.prisma.userCheckin.create({
      data,
    });
  }

  async findAll(): Promise<UserCheckin[]> {
    return this.prisma.userCheckin.findMany();
  }

  async findOne(id: string): Promise<UserCheckin | null> {
    return this.prisma.userCheckin.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserCheckinUpdateInput,
  ): Promise<UserCheckin> {
    return this.prisma.userCheckin.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserCheckin> {
    return this.prisma.userCheckin.delete({
      where: { id },
    });
  }
}
