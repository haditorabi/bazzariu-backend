import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserScoreService } from './user-score.service';
import {
  UserScore,
  CreateUserScoreInput,
  UpdateUserScoreInput,
} from './user-score.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserScore)
export class UserScoreResolver {
  constructor(private service: UserScoreService) {}

  @Query(() => [UserScore])
  async userScores() {
    return this.service.findAll();
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
}
