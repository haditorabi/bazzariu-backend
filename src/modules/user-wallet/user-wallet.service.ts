import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserWallet } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class UserWalletService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create user wallet')
  async create(data: Prisma.UserWalletCreateInput): Promise<UserWallet> {
    return this.prisma.userWallet.create({
      data,
    });
  }

  @ServiceErrorHandler('find all user wallets')
  async findAll(params: {
    skip: number;
    limit: number;
  }): Promise<UserWallet[]> {
    const { skip, limit } = params;
    return this.prisma.userWallet.findMany({
      skip,
      take: limit,
    });
  }

  @ServiceErrorHandler('find one user wallet')
  async findOne(id: string): Promise<UserWallet | null> {
    return this.prisma.userWallet.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update user wallet')
  async update(
    id: string,
    data: Prisma.UserWalletUpdateInput,
  ): Promise<UserWallet> {
    return this.prisma.userWallet.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete user wallet')
  async delete(id: string): Promise<UserWallet> {
    return this.prisma.userWallet.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('find user for user wallet')
  async findUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
