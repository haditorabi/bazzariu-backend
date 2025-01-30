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

@Resolver(() => UserFollowing)
export class UserFollowingResolver {
  constructor(private service: UserFollowingService) {}

  @Query(() => [UserFollowing])
  async userFollowings(
    @Args('skip', { type: () => Number, nullable: true }) skip: number = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit: number = 10,
  ) {
    return this.service.findAll({ skip, limit });
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
      followee: { connect: { id: followee } },
      follower: { connect: { id: follower } },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => UserFollowing)
  async updateUserFollowing(
    @Args('id') id: string,

    @Args('data') data: UpdateUserFollowingInput,
  ) {
    const { follower, followee, ...rest } = data;
    const prismaData: Prisma.UserFollowingUpdateInput = {
      ...rest,
      ...(follower && { follower: { connect: { id: follower } } }),
      ...(followee && { followee: { connect: { id: followee } } }),
    };
    return this.service.update(id, prismaData);
  }

  @ResolveField(() => CommonUser)
  async follower(@Parent() userFollowing: UserFollowing) {
    return this.service.findUserById(userFollowing.follower.id);
  }

  @ResolveField(() => CommonUser)
  async followee(@Parent() userFollowing: UserFollowing) {
    return this.service.findUserById(userFollowing.followee.id);
  }
}
