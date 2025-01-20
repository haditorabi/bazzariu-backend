import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    console.log('PrismaService injected into UserService:', prisma !== null);
  }

  async createUser(data: { email: string; password: string; name: string }) {
    try {
      return await this.prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
