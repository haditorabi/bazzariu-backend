import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserReview } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserReviewService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create user review')
  async create(data: Prisma.UserReviewCreateInput): Promise<UserReview> {
    return this.prisma.userReview.create({
      data,
    });
  }

  @ServiceErrorHandler('find all user reviews')
  async findAll(paginationArgs: PaginationArgs): Promise<UserReview[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userReview.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one user review')
  async findOne(id: string): Promise<UserReview | null> {
    return this.prisma.userReview.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update user review')
  async update(
    id: string,
    data: Prisma.UserReviewUpdateInput,
  ): Promise<UserReview> {
    return this.prisma.userReview.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete user review')
  async delete(id: string): Promise<UserReview> {
    return this.prisma.userReview.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get user by ID')
  async getUserById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
