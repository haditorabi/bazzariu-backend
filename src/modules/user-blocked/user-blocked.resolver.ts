import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserBlockedService } from './user-blocked.service';
import {
  UserBlocked,
  CreateUserBlockedInput,
  UpdateUserBlockedInput,
} from './user-blocked.graphql';
import { Prisma } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Resolver(() => UserBlocked)
export class UserBlockedResolver {
  constructor(private service: UserBlockedService) {}

  @Query(() => [UserBlocked])
  async userBlockes(
    @Args('skip', { type: () => Number, nullable: true }) skip?: number,
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
  ) {
    return this.service.findAll(skip, limit);
  }

  @Query(() => UserBlocked)
  async userBlocke(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBlocked)
  @ServiceErrorHandler('Create user block')
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
  @ServiceErrorHandler('Update user block')
  async updateUserBlocked(
    @Args('id') id: string,
    @Args('data') data: UpdateUserBlockedInput,
  ) {
    const { user, blocked, ...rest } = data;

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

  @ResolveField(() => UserBlocked)
  async user(@Parent() userBlocked: UserBlocked) {
    return this.service.findOne(userBlocked.user.id);
  }

  @ResolveField(() => UserBlocked)
  async blocked(@Parent() userBlocked: UserBlocked) {
    return this.service.findOne(userBlocked.blocked.id);
  }
}
