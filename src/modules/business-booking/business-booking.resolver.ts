import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessBookingService } from './business-booking.service';
import {
  BusinessBooking,
  CreateBusinessBookingInput,
  UpdateBusinessBookingInput,
} from './business-booking.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { CommonBookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => BusinessBooking)
export class BusinessBookingResolver {
  constructor(private service: BusinessBookingService) {}

  @Query(() => [BusinessBooking])
  async businessBookings(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
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
  async updateBusinessBooking(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessBookingInput,
  ) {
    const { business, businessProduct, ...rest } = data;

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
  @Mutation(() => BusinessBooking)
  async deleteBusinessBooking(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessBooking: BusinessBooking) {
    return this.service.getBusiness(businessBooking.business.id);
  }

  @ResolveField(() => [CommonBusinessProduct], { nullable: 'items' })
  async businessProduct(@Parent() businessBooking: BusinessBooking) {
    return this.service.getBusinessProducts(
      businessBooking.businessProduct.map((product) => product.id),
    );
  }

  @ResolveField(() => [CommonBookingTimeSlot], { nullable: 'items' })
  async bookingTimeSlot(@Parent() businessBooking: BusinessBooking) {
    return this.service.getBookingTimeSlots(businessBooking.id);
  }
}
