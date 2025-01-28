import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BookingTimeSlot } from '@prisma/client';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';

@Injectable()
export class BookingTimeSlotService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.BookingTimeSlotCreateInput,
  ): Promise<BookingTimeSlot> {
    return this.prisma.bookingTimeSlot.create({
      data,
    });
  }

  async findAll(): Promise<BookingTimeSlot[]> {
    return this.prisma.bookingTimeSlot.findMany();
  }

  async findOne(id: string): Promise<BookingTimeSlot | null> {
    return this.prisma.bookingTimeSlot.findUnique({
      where: { id },
    });
  }
  async findBusinessBookingsByBusinessBookingId(
    id: string,
  ): Promise<CommonBusinessBooking[]> {
    return this.prisma.businessBooking.findMany({
      where: { id },
    });
  }
  async update(
    id: string,
    data: Prisma.BookingTimeSlotUpdateInput,
  ): Promise<BookingTimeSlot> {
    return this.prisma.bookingTimeSlot.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BookingTimeSlot> {
    return this.prisma.bookingTimeSlot.delete({
      where: { id },
    });
  }
}
