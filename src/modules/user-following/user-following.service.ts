import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserFollowing } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class UserFollowingService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create UserFollowing')
  async create(data: Prisma.UserFollowingCreateInput): Promise<UserFollowing> {
    return this.prisma.userFollowing.create({ data });
  }

  @ServiceErrorHandler('findAll UserFollowings')
  async findAll({
    skip,
    limit,
  }: {
    skip: number;
    limit: number;
  }): Promise<UserFollowing[]> {
    return this.prisma.userFollowing.findMany({
      skip,
      take: limit,
    });
  }

  @ServiceErrorHandler('findOne UserFollowing')
  async findOne(id: string): Promise<UserFollowing | null> {
    return this.prisma.userFollowing.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update UserFollowing')
  async update(
    id: string,
    data: Prisma.UserFollowingUpdateInput,
  ): Promise<UserFollowing> {
    return this.prisma.userFollowing.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete UserFollowing')
  async delete(id: string): Promise<UserFollowing> {
    return this.prisma.userFollowing.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('findUserById')
  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
