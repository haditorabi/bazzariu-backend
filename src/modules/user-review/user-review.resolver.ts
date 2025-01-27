import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserReviewService } from './user-review.service';
import {
  UserReview,
  CreateUserReviewInput,
  UpdateUserReviewInput,
} from './user-review.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserReview)
export class UserReviewResolver {
  constructor(private service: UserReviewService) {}

  @Query(() => [UserReview])
  async userReviews() {
    return this.service.findAll();
  }

  @Query(() => UserReview)
  async userReview(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserReview)
  async createUserReview(@Args('data') data: CreateUserReviewInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserReviewCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserReview)
  async updateUserReview(@Args('data') data: UpdateUserReviewInput) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserReviewUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
