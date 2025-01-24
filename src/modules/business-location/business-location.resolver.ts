import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessLocationService } from './business-location.service';
import {
  BusinessLocation,
  CreateBusinessLocationInput,
  UpdateBusinessLocationInput,
} from './business-location.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessLocation)
export class BusinessLocationResolver {
  constructor(private service: BusinessLocationService) {}

  @Query(() => [BusinessLocation])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => BusinessLocation)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessLocation)
  async createBusinessLocation(
    @Args('data') data: CreateBusinessLocationInput,
  ) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessLocationCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessLocation)
  async updateBusinessLocation(
    @Args('data') data: UpdateBusinessLocationInput,
  ) {
    const { id, business, ...rest } = data;

    const prismaData: Prisma.BusinessLocationUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
