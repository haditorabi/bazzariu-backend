import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessBooking } from '@prisma/client';

@Injectable()
export class BusinessBookingService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BusinessBookingCreateInput,
  ): Promise<BusinessBooking> {
    return this.prisma.businessBooking.create({
      data,
    });
  }

  async findAll(): Promise<BusinessBooking[]> {
    return this.prisma.businessBooking.findMany();
  }

  async findOne(id: string): Promise<BusinessBooking | null> {
    return this.prisma.businessBooking.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessBookingUpdateInput,
  ): Promise<BusinessBooking> {
    return this.prisma.businessBooking.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessBooking> {
    return this.prisma.businessBooking.delete({
      where: { id },
    });
  }
}
