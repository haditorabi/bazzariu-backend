import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { BookingTimeSlotService } from './booking-time-slot.service';
import {
  BookingTimeSlot,
  CreateBookingTimeSlotInput,
  UpdateBookingTimeSlotInput,
} from './booking-time-slot.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';

@Resolver(() => BookingTimeSlot)
export class BookingTimeSlotResolver {
  constructor(private service: BookingTimeSlotService) {}

  @Query(() => [BookingTimeSlot])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => BookingTimeSlot, { nullable: true })
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }
  @ResolveField(() => CommonBusinessBooking)
  async businessBooking(@Root() bookingTimeSlot: BookingTimeSlot) {
    return this.service.getBusinessBooking(bookingTimeSlot.id);
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
  async updateBookingTimeSlot(
    @Args('id') id: string,
    @Args('data') data: UpdateBookingTimeSlotInput,
  ) {
    const { businessBooking, ...rest } = data;

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
  @Mutation(() => Boolean)
  async deleteBookingTimeSlot(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
