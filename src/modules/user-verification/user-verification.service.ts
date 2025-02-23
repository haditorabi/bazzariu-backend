import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserVerification } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserVerificationService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create User Verification')
  async create(
    data: Prisma.UserVerificationCreateInput,
  ): Promise<UserVerification> {
    return this.prisma.userVerification.create({
      data,
    });
  }

  @ServiceErrorHandler('Get All User Verifications')
  async findAll(paginationArgs: PaginationArgs): Promise<UserVerification[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userVerification.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all UserVerification')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[UserVerification[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.userVerification.findMany({
        skip,
        take,
      }),
      this.prisma.userVerification.count(),
    ]);
    return [items, totalCount];
  }

  @ServiceErrorHandler('Get One User Verification')
  async findOne(id: string): Promise<UserVerification | null> {
    return this.prisma.userVerification.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update User Verification')
  async update(
    id: string,
    data: Prisma.UserVerificationUpdateInput,
  ): Promise<UserVerification> {
    return this.prisma.userVerification.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete User Verification')
  async delete(id: string): Promise<UserVerification> {
    return this.prisma.userVerification.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('Get User by ID')
  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
