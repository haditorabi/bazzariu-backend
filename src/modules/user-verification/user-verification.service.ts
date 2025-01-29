import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserVerification } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
  async findAll(params: {
    skip: number;
    limit: number;
  }): Promise<UserVerification[]> {
    const { skip, limit } = params;
    return this.prisma.userVerification.findMany({
      skip,
      take: limit,
    });
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
