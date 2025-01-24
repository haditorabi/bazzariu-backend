import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessUpdateService } from './business-update.service';
import {
  BusinessUpdate,
  CreateBusinessUpdateInput,
  UpdateBusinessUpdateInput,
} from './business-update.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessUpdate)
export class BusinessUpdateResolver {
  constructor(private service: BusinessUpdateService) {}

  @Query(() => [BusinessUpdate])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => BusinessUpdate)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessUpdate)
  async createBusinessUpdate(@Args('data') data: CreateBusinessUpdateInput) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessUpdate)
  async updateBusinessUpdate(@Args('data') data: UpdateBusinessUpdateInput) {
    const { id, business, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateUpdateInput = {
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
