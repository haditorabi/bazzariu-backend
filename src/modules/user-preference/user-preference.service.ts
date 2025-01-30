import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserPreference } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserPreferenceService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create User Preference')
  async create(
    data: Prisma.UserPreferenceCreateInput,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All User Preferences')
  async findAll(paginationArgs: PaginationArgs): Promise<UserPreference[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.userPreference.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find One User Preference')
  async findOne(id: string): Promise<UserPreference | null> {
    return this.prisma.userPreference.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update User Preference')
  async update(
    id: string,
    data: Prisma.UserPreferenceUpdateInput,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete User Preference')
  async delete(id: string): Promise<UserPreference> {
    return this.prisma.userPreference.delete({
      where: { id },
    });
  }
}
