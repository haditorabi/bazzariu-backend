import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessLocationService } from './business-location.service';
import {
  BusinessLocation,
  CreateBusinessLocationInput,
  UpdateBusinessLocationInput,
} from './business-location.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => BusinessLocation)
export class BusinessLocationResolver {
  constructor(private service: BusinessLocationService) {}

  @Query(() => [BusinessLocation])
  async businessLocations(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessLocation)
  async businessLocation(@Args('id') id: string) {
    const businessLocation = await this.service.findOne(id);
    if (!businessLocation) {
      throw new NotFoundException('businessLocation not found');
    }

    return businessLocation;
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
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessLocationInput,
  ) {
    const { business, ...rest } = data;

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

  @ResolveField(() => String, { nullable: true })
  async business(@Parent() businessLocation: BusinessLocation) {
    // Example: resolve the business associated with the location
    return this.service.getBusiness(businessLocation.business.id);
  }
}
