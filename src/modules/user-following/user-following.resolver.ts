import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserFollowingService } from './user-following.service';
import {
  UserFollowing,
  CreateUserFollowingInput,
  UpdateUserFollowingInput,
} from './user-following.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => UserFollowing)
export class UserFollowingResolver {
  constructor(private service: UserFollowingService) {}

  @Query(() => [UserFollowing])
  async userFollowings(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserFollowing)
  async userFollowing(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserFollowing)
  async createUserFollowing(@Args('data') data: CreateUserFollowingInput) {
    const { followerId, followeeId, ...rest } = data;
    const prismaData: Prisma.UserFollowingCreateInput = {
      ...rest,
      followee: { connect: { id: followeeId } },
      follower: { connect: { id: followerId } },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => UserFollowing)
  async updateUserFollowing(
    @Args('id') id: string,

    @Args('data') data: UpdateUserFollowingInput,
  ) {
    const { followerId, followeeId, ...rest } = data;
    const prismaData: Prisma.UserFollowingUpdateInput = {
      ...rest,
      ...(followerId && { follower: { connect: { id: followerId } } }),
      ...(followeeId && { followee: { connect: { id: followeeId } } }),
    };
    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserFollowing)
  async deleteUserFollowing(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async follower(@Parent() userFollowing: UserFollowing) {
    return this.service.getUser(userFollowing.followerId);
  }

  @ResolveField(() => CommonUser)
  async followee(@Parent() userFollowing: UserFollowing) {
    return this.service.getUser(userFollowing.followeeId);
  }
}
