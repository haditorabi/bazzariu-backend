import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserPreference } from '@prisma/client';

@Injectable()
export class UserPreferenceService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.UserPreferenceCreateInput,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.create({
      data,
    });
  }

  async findAll(): Promise<UserPreference[]> {
    return this.prisma.userPreference.findMany();
  }

  async findOne(id: string): Promise<UserPreference | null> {
    return this.prisma.userPreference.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserPreferenceUpdateInput,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserPreference> {
    return this.prisma.userPreference.delete({
      where: { id },
    });
  }
}
