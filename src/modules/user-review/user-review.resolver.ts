import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserReviewService } from './user-review.service';
import {
  UserReview,
  CreateUserReviewInput,
  UpdateUserReviewInput,
} from './user-review.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';
import { User } from '../user/user.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
@Resolver(() => UserReview)
export class UserReviewResolver {
  constructor(private service: UserReviewService) {}

  @Query(() => [UserReview])
  async userReviews(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserReview)
  async userReview(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserReview)
  async createUserReview(@Args('data') data: CreateUserReviewInput) {
    const { userId, ...rest } = data;
    const prismaData: Prisma.UserReviewCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => UserReview)
  async updateUserReview(
    @Args('id') id: string,
    @Args('data') data: UpdateUserReviewInput,
  ) {
    const { userId, ...rest } = data;
    const prismaData: Prisma.UserReviewUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserReview)
  async deleteUserReview(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() userReview: UserReview): Promise<User> {
    const { userId } = userReview; // Assuming userId is part of the UserReview model
    return this.service.getUserById(userId);
  }
}
