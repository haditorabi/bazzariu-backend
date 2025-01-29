import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  BusinessBooking,
  Business,
  BusinessProduct,
  BookingTimeSlot,
} from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class BusinessBookingService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create business booking')
  async create(
    data: Prisma.BusinessBookingCreateInput,
  ): Promise<BusinessBooking> {
    return this.prisma.businessBooking.create({
      data,
    });
  }

  @ServiceErrorHandler('get all business bookings')
  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<BusinessBooking[]> {
    return this.prisma.businessBooking.findMany({
      skip,
      take,
      include: {
        business: true, // Include business data
        businessProduct: true, // Include associated products
        BookingTimeSlot: true, // Include booking time slots
      },
    });
  }

  @ServiceErrorHandler('get business booking by id')
  async findOne(id: string): Promise<BusinessBooking | null> {
    return this.prisma.businessBooking.findUnique({
      where: { id },
      include: {
        business: true, // Include business data
        businessProduct: true, // Include associated products
        BookingTimeSlot: true, // Include booking time slots
      },
    });
  }

  @ServiceErrorHandler('update business booking')
  async update(
    id: string,
    data: Prisma.BusinessBookingUpdateInput,
  ): Promise<BusinessBooking> {
    return this.prisma.businessBooking.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete business booking')
  async delete(id: string): Promise<BusinessBooking> {
    return this.prisma.businessBooking.delete({
      where: { id },
    });
  }
  async getBusiness(businessId: string): Promise<Business> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }

  async getBusinessProducts(
    businessProductIds: string[],
  ): Promise<BusinessProduct[]> {
    return this.prisma.businessProduct.findMany({
      where: { id: { in: businessProductIds } },
    });
  }

  async getBookingTimeSlots(bookingId: string): Promise<BookingTimeSlot[]> {
    return this.prisma.bookingTimeSlot.findMany({
      where: { businessBookingId: bookingId },
    });
  }
}
