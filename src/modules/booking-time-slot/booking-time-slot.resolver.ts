import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingTimeSlotService } from './booking-time-slot.service';
import {
  BookingTimeSlot,
  CreateBookingTimeSlotInput,
  UpdateBookingTimeSlotInput,
} from './booking-time-slot.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BookingTimeSlot)
export class BookingTimeSlotResolver {
  constructor(private service: BookingTimeSlotService) {}

  @Query(() => [BookingTimeSlot])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => BookingTimeSlot)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BookingTimeSlot)
  async createBookingTimeSlot(@Args('data') data: CreateBookingTimeSlotInput) {
    const { businessBooking, ...rest } = data;

    const prismaData: Prisma.BookingTimeSlotCreateInput = {
      ...rest,
      businessBooking: {
        connect: { id: businessBooking },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BookingTimeSlot)
  async updateBookingTimeSlot(@Args('data') data: UpdateBookingTimeSlotInput) {
    const { id, businessBooking, ...rest } = data;

    const prismaData: Prisma.BookingTimeSlotUpdateInput = {
      ...rest,
      ...(businessBooking && {
        businessBooking: {
          connect: { id: businessBooking },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
