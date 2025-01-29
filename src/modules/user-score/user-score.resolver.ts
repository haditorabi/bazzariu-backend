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
@Resolver(() => UserScore)
export class UserScoreResolver {
  constructor(private service: UserScoreService) {}

  @Query(() => [UserScore])
  async userScores(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAll(page, limit);
  }

  @Query(() => UserScore)
  async userScore(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserScore)
  async createUserScore(@Args('data') data: CreateUserScoreInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserScoreCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserScore)
  async updateUserScore(@Args('data') data: UpdateUserScoreInput) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserScoreUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  @ResolveField(() => User)
  async user(@Parent() userScore: UserScore) {
    return this.service.getUserById(userScore.user.id);
  }
}
