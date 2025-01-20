import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserWallet } from '@prisma/client';

@Injectable()
export class UserWalletService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserWalletCreateInput): Promise<UserWallet> {
    return this.prisma.userWallet.create({
      data,
    });
  }

  async findAll(): Promise<UserWallet[]> {
    return this.prisma.userWallet.findMany();
  }

  async findOne(id: string): Promise<UserWallet | null> {
    return this.prisma.userWallet.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserWalletUpdateInput,
  ): Promise<UserWallet> {
    return this.prisma.userWallet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserWallet> {
    return this.prisma.userWallet.delete({
      where: { id },
    });
  }
}
