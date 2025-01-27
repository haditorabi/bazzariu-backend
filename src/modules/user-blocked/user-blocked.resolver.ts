import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserBlockedService } from './user-blocked.service';
import {
  UserBlocked,
  CreateUserBlockedInput,
  UpdateUserBlockedInput,
} from './user-blocked.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserBlocked)
export class UserBlockedResolver {
  constructor(private service: UserBlockedService) {}

  @Query(() => [UserBlocked])
  async userBlockes() {
    return this.service.findAll();
  }

  @Query(() => UserBlocked)
  async userBlocke(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBlocked)
  async createUserBlocked(@Args('data') data: CreateUserBlockedInput) {
    const { user, blocked, ...rest } = data;

    const prismaData: Prisma.UserBlockedCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
      blocked: {
        connect: { id: blocked },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserBlocked)
  async updateUserBlocked(@Args('data') data: UpdateUserBlockedInput) {
    const { id, user, blocked, ...rest } = data;

    const prismaData: Prisma.UserBlockedUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
      ...(blocked && {
        blocked: {
          connect: { id: blocked },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
