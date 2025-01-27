import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserBookingService } from './user-booking.service';
import {
  UserBooking,
  CreateUserBookingInput,
  UpdateUserBookingInput,
} from './user-booking.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserBooking)
export class UserBookingResolver {
  constructor(private service: UserBookingService) {}

  @Query(() => [UserBooking])
  async userBookings() {
    return this.service.findAll();
  }

  @Query(() => UserBooking)
  async userBooking(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBooking)
  async createUserBooking(@Args('data') data: CreateUserBookingInput) {
    const { user, bookingTimeSlot, businessProduct, ...rest } = data;

    const prismaData: Prisma.UserBookingCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
      bookingTimeSlot: {
        connect: { id: bookingTimeSlot },
      },
      ...(businessProduct && {
        businessProduct: {
          connect: businessProduct.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserBooking)
  async updateUserBooking(@Args('data') data: UpdateUserBookingInput) {
    const { id, user, bookingTimeSlot, businessProduct, ...rest } = data;

    const prismaData: Prisma.UserBookingUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
      ...(bookingTimeSlot && {
        bookingTimeSlot: {
          connect: { id: bookingTimeSlot },
        },
      }),
      ...(businessProduct && {
        businessProduct: {
          connect: businessProduct.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
