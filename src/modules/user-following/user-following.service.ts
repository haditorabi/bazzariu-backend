import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserFollowing } from '@prisma/client';

@Injectable()
export class UserFollowingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserFollowingCreateInput): Promise<UserFollowing> {
    return this.prisma.userFollowing.create({
      data,
    });
  }

  async findAll(): Promise<UserFollowing[]> {
    return this.prisma.userFollowing.findMany();
  }

  async findOne(id: string): Promise<UserFollowing | null> {
    return this.prisma.userFollowing.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserFollowingUpdateInput,
  ): Promise<UserFollowing> {
    return this.prisma.userFollowing.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserFollowing> {
    return this.prisma.userFollowing.delete({
      where: { id },
    });
  }
}
