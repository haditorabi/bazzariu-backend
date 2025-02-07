import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserScoreService } from './user-score.service';
import {
  UserScore,
  CreateUserScoreInput,
  UpdateUserScoreInput,
} from './user-score.graphql';
import { Prisma } from '@prisma/client';
import { User } from '../user/user.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
@Resolver(() => UserScore)
export class UserScoreResolver {
  constructor(private service: UserScoreService) {}

  @Query(() => [UserScore])
  async userScores(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserScore)
  async userScore(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserScore)
  async createUserScore(@Args('data') data: CreateUserScoreInput) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserScoreCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserScore)
  async updateUserScore(
    @Args('id') id: string,
    @Args('data') data: UpdateUserScoreInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserScoreUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserScore)
  async deleteUserScore(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => User)
  async user(@Parent() userScore: UserScore) {
    return this.service.getUserById(userScore.userId);
  }
}
