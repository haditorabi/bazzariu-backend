import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserScore } from '@prisma/client';

@Injectable()
export class UserScoreService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserScoreCreateInput): Promise<UserScore> {
    return this.prisma.userScore.create({
      data,
    });
  }

  async findAll(): Promise<UserScore[]> {
    return this.prisma.userScore.findMany();
  }

  async findOne(id: string): Promise<UserScore | null> {
    return this.prisma.userScore.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserScoreUpdateInput,
  ): Promise<UserScore> {
    return this.prisma.userScore.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserScore> {
    return this.prisma.userScore.delete({
      where: { id },
    });
  }
}
