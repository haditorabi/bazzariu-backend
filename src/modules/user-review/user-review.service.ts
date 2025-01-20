import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserReview } from '@prisma/client';

@Injectable()
export class UserReviewService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserReviewCreateInput): Promise<UserReview> {
    return this.prisma.userReview.create({
      data,
    });
  }

  async findAll(): Promise<UserReview[]> {
    return this.prisma.userReview.findMany();
  }

  async findOne(id: string): Promise<UserReview | null> {
    return this.prisma.userReview.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserReviewUpdateInput,
  ): Promise<UserReview> {
    return this.prisma.userReview.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserReview> {
    return this.prisma.userReview.delete({
      where: { id },
    });
  }
}
