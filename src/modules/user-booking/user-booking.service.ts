import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserBooking } from '@prisma/client';

@Injectable()
export class UserBookingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserBookingCreateInput): Promise<UserBooking> {
    return this.prisma.userBooking.create({
      data,
    });
  }

  async findAll(): Promise<UserBooking[]> {
    return this.prisma.userBooking.findMany();
  }

  async findOne(id: string): Promise<UserBooking | null> {
    return this.prisma.userBooking.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.UserBookingUpdateInput,
  ): Promise<UserBooking> {
    return this.prisma.userBooking.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UserBooking> {
    return this.prisma.userBooking.delete({
      where: { id },
    });
  }
}
