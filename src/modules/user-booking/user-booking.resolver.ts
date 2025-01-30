import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserBookingService } from './user-booking.service';
import {
  UserBooking,
  CreateUserBookingInput,
  UpdateUserBookingInput,
} from './user-booking.graphql';
import { Prisma } from '@prisma/client';
import { CommonBookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { CommonUser } from 'src/graphql/user.type';
@Resolver(() => UserBooking)
export class UserBookingResolver {
  constructor(private service: UserBookingService) {}

  @Query(() => [UserBooking])
  async userBookings(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true })
    limit: number = 10,
  ) {
    return this.service.findAll({ page, limit });
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
  async updateUserBooking(
    @Args('id') id: string,
    @Args('data') data: UpdateUserBookingInput,
  ) {
    const { user, bookingTimeSlot, businessProduct, ...rest } = data;

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

  // ResolveField for user
  @ResolveField(() => CommonUser)
  async user(@Parent() userBooking: UserBooking) {
    return this.service.getUser(userBooking.user.id);
  }

  // ResolveField for businessProductId
  @ResolveField(() => [String])
  async businessProductId(@Parent() userBooking: UserBooking) {
    return this.service.getBusinessProducts(userBooking.businessProductId);
  }

  // ResolveField for bookingTimeSlotId
  @ResolveField(() => CommonBookingTimeSlot)
  async bookingTimeSlotId(@Parent() userBooking: UserBooking) {
    return this.service.getBookingTimeSlot(userBooking.bookingTimeSlot.id);
  }
}
