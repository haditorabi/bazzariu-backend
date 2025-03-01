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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { NotFoundException } from '@nestjs/common';
import { PaginatedBookingTimeSlot } from 'src/graphql/paginated-response';

@Resolver(() => BookingTimeSlot)
export class BookingTimeSlotResolver {
  constructor(private service: BookingTimeSlotService) {}

  @Query(() => [BookingTimeSlot])
  async bookingTimeSlots(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBookingTimeSlot)
  async allBookingTimeSlot(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }
  @Query(() => BookingTimeSlot, { nullable: true })
  async bookingTimeSlot(@Args('id') id: string) {
    const bookingTimeSlot = await this.service.findOne(id);
    if (!bookingTimeSlot) {
      throw new NotFoundException('bookingTimeSlot not found');
    }

    return bookingTimeSlot;
  }
  @ResolveField(() => CommonBusinessBooking)
  async businessBooking(@Root() bookingTimeSlot: BookingTimeSlot) {
    return this.service.getBusinessBooking(bookingTimeSlot.businessBookingId);
  }
  @Mutation(() => BookingTimeSlot)
  async createBookingTimeSlot(@Args('data') data: CreateBookingTimeSlotInput) {
    const { businessBookingId, ...rest } = data;

    const prismaData: Prisma.BookingTimeSlotCreateInput = {
      ...rest,
      businessBooking: {
        connect: { id: businessBookingId },
      },
    };

    const createdBookingTimeSlot = await this.service.create(prismaData);
    if (!createdBookingTimeSlot) {
      throw new Error(`BookingTimeSlot Creation Error`);
    }
    return createdBookingTimeSlot;
  }

  @Mutation(() => BookingTimeSlot)
  async updateBookingTimeSlot(
    @Args('id') id: string,
    @Args('data') data: UpdateBookingTimeSlotInput,
  ) {
    const { businessBookingId, ...rest } = data;

    const prismaData: Prisma.BookingTimeSlotUpdateInput = {
      ...rest,
      ...(businessBookingId && {
        businessBooking: {
          connect: { id: businessBookingId },
        },
      }),
    };

    const updatedBookingTimeSlot = await this.service.update(id, prismaData);
    if (!updatedBookingTimeSlot) {
      throw new Error(`BookingTimeSlot with id ${id} not found`);
    }
    return updatedBookingTimeSlot;
  }
  @Mutation(() => Boolean)
  async deleteBookingTimeSlot(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
