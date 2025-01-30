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
import { BusinessBoostType, Prisma } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

@Resolver(() => BusinessBoost)
export class BusinessBoostResolver {
  constructor(private service: BusinessBoostService) {}

  @Query(() => [BusinessBoost])
  async businessBoosts(
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
    @Args('type', { nullable: true }) type?: BusinessBoostType,
  ) {
    return this.service.findAll({ skip, take, type });
  }

  @Query(() => BusinessBoost)
  async businessBoost(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessBoost)
  async createBusinessBoost(@Args('data') data: CreateBusinessBoostInput) {
    const { business, ...rest } = data;
    const prismaData: Prisma.BusinessBoostCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessBoost)
  async updateBusinessBoost(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessBoostInput,
  ) {
    const { business, ...rest } = data;
    const prismaData: Prisma.BusinessBoostUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
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
    return this.service.getBusiness(boost.business.id);
  }
}
