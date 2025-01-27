import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessBookingService } from './business-booking.service';
import {
  BusinessBooking,
  CreateBusinessBookingInput,
  UpdateBusinessBookingInput,
} from './business-booking.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessBooking)
export class BusinessBookingResolver {
  constructor(private service: BusinessBookingService) {}

  @Query(() => [BusinessBooking])
  async businessBookings() {
    return this.service.findAll();
  }

  @Query(() => BusinessBooking)
  async businessBooking(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessBooking)
  async createBusinessBooking(@Args('data') data: CreateBusinessBookingInput) {
    const { business, businessProduct, ...rest } = data;

    const prismaData: Prisma.BusinessBookingCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
      ...(businessProduct && {
        businessProduct: {
          connect: businessProduct.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessBooking)
  async updateBusinessBooking(@Args('data') data: UpdateBusinessBookingInput) {
    const { id, business, businessProduct, ...rest } = data;

    const prismaData: Prisma.BusinessBookingUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
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
