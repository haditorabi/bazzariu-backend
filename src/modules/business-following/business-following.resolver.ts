import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessFollowingService } from './business-following.service';
import {
  BusinessFollowing,
  CreateBusinessFollowingInput,
  UpdateBusinessFollowingInput,
} from './business-following.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
@Resolver(() => BusinessFollowing)
export class BusinessFollowingResolver {
  constructor(private service: BusinessFollowingService) {}

  @Query(() => [BusinessFollowing])
  async businessFollowings(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessFollowing)
  async businessFollowing(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessFollowing)
  async createBusinessFollowing(
    @Args('data') data: CreateBusinessFollowingInput,
  ) {
    const { businessId, userId, ...rest } = data;

    const prismaData: Prisma.BusinessFollowingCreateInput = {
      ...rest,
      business: { connect: { id: businessId } },
      user: { connect: { id: userId } },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessFollowing)
  async updateBusinessFollowing(
    @Args('id') id: string,

    @Args('data') data: UpdateBusinessFollowingInput,
  ) {
    const { businessId, userId, ...rest } = data;

    const prismaData: Prisma.BusinessFollowingUpdateInput = {
      ...rest,
      ...(businessId && { business: { connect: { id: businessId } } }),
      ...(userId && { user: { connect: { id: userId } } }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => BusinessFollowing)
  async deleteBusinessFollowing(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessFollowing: BusinessFollowing) {
    return this.service.getBusiness(businessFollowing.businessId);
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() businessFollowing: BusinessFollowing) {
    return this.service.getUser(businessFollowing.userId);
  }
}
