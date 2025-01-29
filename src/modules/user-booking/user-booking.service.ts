import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserBooking } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class UserBookingService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create UserBooking')
  async create(data: Prisma.UserBookingCreateInput): Promise<UserBooking> {
    return this.prisma.userBooking.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All UserBookings')
  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<UserBooking[]> {
    return this.prisma.userBooking.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('Find One UserBooking')
  async findOne(id: string): Promise<UserBooking | null> {
    return this.prisma.userBooking.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update UserBooking')
  async update(
    id: string,
    data: Prisma.UserBookingUpdateInput,
  ): Promise<UserBooking> {
    return this.prisma.userBooking.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete UserBooking')
  async delete(id: string): Promise<UserBooking> {
    return this.prisma.userBooking.delete({
      where: { id },
    });
  }

  // Helper methods for ResolveField
  @ServiceErrorHandler('Get User')
  async getUser(userId: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  @ServiceErrorHandler('Get Business Products')
  async getBusinessProducts(businessProductIds: string[]): Promise<any[]> {
    return this.prisma.businessProduct.findMany({
      where: {
        id: { in: businessProductIds },
      },
    });
  }

  @ServiceErrorHandler('Get Booking TimeSlot')
  async getBookingTimeSlot(bookingTimeSlotId: string): Promise<any> {
    return this.prisma.bookingTimeSlot.findUnique({
      where: { id: bookingTimeSlotId },
    });
  }
}
