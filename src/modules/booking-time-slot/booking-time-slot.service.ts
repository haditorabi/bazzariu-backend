import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BookingTimeSlot } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class BookingTimeSlotService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('find all booking time slots')
  async findAll(paginationArgs: PaginationArgs): Promise<BookingTimeSlot[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.bookingTimeSlot.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find a booking time slot')
  async findOne(id: string): Promise<BookingTimeSlot | null> {
    return this.prisma.bookingTimeSlot.findUnique({
      where: { id },
    });
  }
  @ServiceErrorHandler('create a booking time slot')
  async create(
    data: Prisma.BookingTimeSlotCreateInput,
  ): Promise<BookingTimeSlot> {
    return this.prisma.bookingTimeSlot.create({
      data,
    });
  }

  @ServiceErrorHandler('update a booking time slot')
  async update(
    id: string,
    data: Prisma.BookingTimeSlotUpdateInput,
  ): Promise<BookingTimeSlot> {
    return this.prisma.bookingTimeSlot.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete a booking time slot')
  async delete(id: string): Promise<boolean> {
    await this.prisma.bookingTimeSlot.delete({
      where: { id },
    });
    return true;
  }

  @ServiceErrorHandler('get business booking for a time slot')
  async getBusinessBooking(bookingTimeSlotId: string): Promise<any> {
    return this.prisma.businessBooking.findUnique({
      where: { id: bookingTimeSlotId },
    });
  }
}
