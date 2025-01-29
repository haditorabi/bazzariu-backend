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
@Resolver(() => BusinessFollowing)
export class BusinessFollowingResolver {
  constructor(private service: BusinessFollowingService) {}

  @Query(() => [BusinessFollowing])
  async businessFollowings(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Number, defaultValue: 10 })
    pageSize: number,
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Query(() => BusinessFollowing)
  async businessFollowing(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessFollowing)
  async createBusinessFollowing(
    @Args('data') data: CreateBusinessFollowingInput,
  ) {
    const { business, user, ...rest } = data;

    const prismaData: Prisma.BusinessFollowingCreateInput = {
      ...rest,
      business: { connect: { id: business } },
      user: { connect: { id: user } },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessFollowing)
  async updateBusinessFollowing(
    @Args('data') data: UpdateBusinessFollowingInput,
  ) {
    const { id, business, user, ...rest } = data;

    const prismaData: Prisma.BusinessFollowingUpdateInput = {
      ...rest,
      ...(business && { business: { connect: { id: business } } }),
      ...(user && { user: { connect: { id: user } } }),
    };

    return this.service.update(id, prismaData);
  }

  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessFollowing: BusinessFollowing) {
    return businessFollowing.business;
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() businessFollowing: BusinessFollowing) {
    return businessFollowing.user;
  }
}
