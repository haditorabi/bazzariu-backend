import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BookingTimeSlot } from '@prisma/client';

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
  async getBusinessBooking(bookingTimeSlotId: string) {
    const bookingTimeSlot = await this.prisma.bookingTimeSlot.findUnique({
      where: { id: bookingTimeSlotId },
      include: { businessBooking: true },
    });

    return bookingTimeSlot?.businessBooking || null;
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
