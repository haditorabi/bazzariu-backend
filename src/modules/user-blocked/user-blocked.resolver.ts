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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonUser } from 'src/graphql/user.type';
import { PaginatedUserBlocked } from 'src/graphql/paginated-response';

@Resolver(() => UserBlocked)
export class UserBlockedResolver {
  constructor(private service: UserBlockedService) {}

  @Query(() => [UserBlocked])
  async userBlockes(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedUserBlocked)
  async allUserBlocked(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => UserBlocked)
  async userBlocke(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBlocked)
  @ServiceErrorHandler('Create user block')
  async createUserBlocked(@Args('data') data: CreateUserBlockedInput) {
    const { userId, blockedId, ...rest } = data;

    const prismaData: Prisma.UserBlockedCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
      blocked: {
        connect: { id: blockedId },
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
    const { userId, blockedId, ...rest } = data;

    const prismaData: Prisma.UserBlockedUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
      ...(blockedId && {
        blocked: {
          connect: { id: blockedId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserBlocked)
  async deleteUserBlocked(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() userBlocked: UserBlocked) {
    return this.service.getUser(userBlocked.userId);
  }

  @ResolveField(() => CommonUser)
  async blocked(@Parent() userBlocked: UserBlocked) {
    return this.service.getUser(userBlocked.blockedId);
  }
}
