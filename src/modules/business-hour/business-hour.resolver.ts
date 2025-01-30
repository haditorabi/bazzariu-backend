import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessHourService } from './business-hour.service';
import {
  BusinessHour,
  CreateBusinessHourInput,
  UpdateBusinessHourInput,
} from './business-hour.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => BusinessHour)
export class BusinessHourResolver {
  constructor(private service: BusinessHourService) {}

  @Query(() => [BusinessHour])
  async businessHours(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessHour)
  async businessHour(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessHour)
  async createBusinessHour(@Args('data') data: CreateBusinessHourInput) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessHourCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessHour)
  async updateBusinessHour(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessHourInput,
  ) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessHourUpdateInput = {
      ...rest,
      ...(business && {
        businessBooking: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
