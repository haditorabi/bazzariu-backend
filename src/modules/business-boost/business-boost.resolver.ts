import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessBoostService } from './business-boost.service';
import {
  BusinessBoost,
  CreateBusinessBoostInput,
  UpdateBusinessBoostInput,
} from './business-boost.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => BusinessBoost)
export class BusinessBoostResolver {
  constructor(private service: BusinessBoostService) {}

  @Query(() => [BusinessBoost])
  async businessBoosts(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessBoost)
  async businessBoost(@Args('id') id: string) {
    const businessBoost = await this.service.findOne(id);
    if (!businessBoost) {
      throw new NotFoundException('businessBoost not found');
    }

    return businessBoost;
  }

  @Mutation(() => BusinessBoost)
  async createBusinessBoost(@Args('data') data: CreateBusinessBoostInput) {
    const { businessId, ...rest } = data;
    const prismaData: Prisma.BusinessBoostCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessBoost)
  async updateBusinessBoost(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessBoostInput,
  ) {
    const { businessId, ...rest } = data;
    const prismaData: Prisma.BusinessBoostUpdateInput = {
      ...rest,
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }

  @Mutation(() => BusinessBoost)
  async deleteBusinessBoost(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonBusiness)
  async business(@Parent() boost: BusinessBoost) {
    return this.service.getBusiness(boost.businessId);
  }
}
