import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { BusinessHourService } from './business-hour.service';
import {
  BusinessHour,
  CreateBusinessHourInput,
  UpdateBusinessHourInput,
} from './business-hour.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonBusiness } from 'src/graphql/business.type';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => BusinessHour)
export class BusinessHourResolver {
  constructor(private service: BusinessHourService) {}

  @Query(() => [BusinessHour])
  async businessHours(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessHour)
  async businessHour(@Args('id') id: string) {
    const businessHour = await this.service.findOne(id);
    if (!businessHour) {
      throw new NotFoundException('businessHour not found');
    }

    return businessHour;
  }

  @Mutation(() => BusinessHour)
  async createBusinessHour(@Args('data') data: CreateBusinessHourInput) {
    const { businessId, ...rest } = data;

    const prismaData: Prisma.BusinessHourCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessHour)
  async updateBusinessHour(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessHourInput,
  ) {
    const { businessId, ...rest } = data;

    const prismaData: Prisma.BusinessHourUpdateInput = {
      ...rest,
      ...(businessId && {
        businessBooking: {
          connect: { id: businessId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessHour: BusinessHour) {
    return this.service.getBusiness(businessHour.businessId);
  }
}
