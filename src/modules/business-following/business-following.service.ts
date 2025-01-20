import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessFollowing } from '@prisma/client';

@Injectable()
export class BusinessFollowingService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessFollowingCreateInput,
  ): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.create({
      data,
    });
  }

  async findAll(): Promise<BusinessFollowing[]> {
    return this.prisma.businessFollowing.findMany();
  }

  async findOne(id: string): Promise<BusinessFollowing | null> {
    return this.prisma.businessFollowing.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessFollowingUpdateInput,
  ): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessFollowing> {
    return this.prisma.businessFollowing.delete({
      where: { id },
    });
  }
}
