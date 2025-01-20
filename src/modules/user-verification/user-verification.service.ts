import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserVerification } from '@prisma/client';

@Injectable()
export class UserVerificationService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.UserVerificationCreateInput,
  ): Promise<UserVerification> {
    return this.prisma.userVerification.create({
      data,
    });
  }

  async findAll(): Promise<UserVerification[]> {
    return this.prisma.userVerification.findMany();
  }

  async findOne(id: string): Promise<UserVerification | null> {
    return this.prisma.userVerification.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserVerificationUpdateInput,
  ): Promise<UserVerification> {
    return this.prisma.userVerification.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserVerification> {
    return this.prisma.userVerification.delete({
      where: { id },
    });
  }
}
