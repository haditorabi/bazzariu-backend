import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserScore } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserScoreService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create UserScore')
  async create(data: Prisma.UserScoreCreateInput): Promise<UserScore> {
    return this.prisma.userScore.create({
      data,
    });
  }

  @ServiceErrorHandler('findAll UserScores')
  async findAll(paginationArgs: PaginationArgs): Promise<UserScore[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userScore.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('findOne UserScore')
  async findOne(id: string): Promise<UserScore | null> {
    return this.prisma.userScore.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update UserScore')
  async update(
    id: string,
    data: Prisma.UserScoreUpdateInput,
  ): Promise<UserScore> {
    return this.prisma.userScore.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete UserScore')
  async delete(id: string): Promise<UserScore> {
    return this.prisma.userScore.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get User by ID')
  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
