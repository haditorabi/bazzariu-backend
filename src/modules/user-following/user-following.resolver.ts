import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserFollowingService } from './user-following.service';
import {
  UserFollowing,
  CreateUserFollowingInput,
  UpdateUserFollowingInput,
} from './user-following.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserFollowing)
export class UserFollowingResolver {
  constructor(private service: UserFollowingService) {}

  @Query(() => [UserFollowing])
  async userFollowings() {
    return this.service.findAll();
  }

  @Query(() => UserFollowing)
  async userFollowing(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserFollowing)
  async createUserFollowing(@Args('data') data: CreateUserFollowingInput) {
    const { follower, followee, ...rest } = data;

    const prismaData: Prisma.UserFollowingCreateInput = {
      ...rest,
      followee: {
        connect: { id: followee },
      },
      follower: {
        connect: { id: follower },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserFollowing)
  async updateUserFollowing(@Args('data') data: UpdateUserFollowingInput) {
    const { id, follower, followee, ...rest } = data;

    const prismaData: Prisma.UserFollowingUpdateInput = {
      ...rest,
      ...(follower && {
        follower: {
          connect: { id: follower },
        },
      }),
      ...(followee && {
        followee: {
          connect: { id: followee },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
