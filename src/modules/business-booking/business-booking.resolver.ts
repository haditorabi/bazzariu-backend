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
import { NotFoundException } from '@nestjs/common';
import { PaginatedBusinessBooking } from 'src/graphql/paginated-response';

@Resolver(() => BusinessBooking)
export class BusinessBookingResolver {
  constructor(private service: BusinessBookingService) {}

  @Query(() => [BusinessBooking])
  async businessBookings(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBusinessBooking)
  async allBusinessBooking(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }
  @Query(() => BusinessBooking)
  async businessBooking(@Args('id') id: string) {
    const businessBooking = await this.service.findOne(id);

    if (!businessBooking) {
      throw new NotFoundException('BusinessBooking not found');
    }

    return businessBooking;
  }

  @Mutation(() => BusinessBooking)
  async createBusinessBooking(@Args('data') data: CreateBusinessBookingInput) {
    const { businessId, businessProductId, ...rest } = data;

    const prismaData: Prisma.BusinessBookingCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
      ...(businessProductId && {
        businessProduct: {
          connect: businessProductId.map((id) => ({ id })),
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
    const { businessId, businessProductId, ...rest } = data;

    const prismaData: Prisma.BusinessBookingUpdateInput = {
      ...rest,
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
      ...(businessProductId && {
        businessProduct: {
          connect: businessProductId.map((id) => ({ id })),
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
    return this.service.getBusiness(businessBooking.businessId);
  }

  @ResolveField(() => [CommonBusinessProduct], { nullable: 'items' })
  async businessProduct(@Parent() businessBooking: BusinessBooking) {
    return this.service.getBusinessProducts(
      businessBooking.businessProductId.map((product) => product),
    );
  }

  @ResolveField(() => [CommonBookingTimeSlot], { nullable: 'items' })
  async bookingTimeSlot(@Parent() businessBooking: BusinessBooking) {
    return this.service.getBookingTimeSlots(businessBooking.id);
  }
}
