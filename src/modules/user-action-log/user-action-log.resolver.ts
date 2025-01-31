import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserActionLogService } from './user-action-log.service';
import {
  UserActionLog,
  CreateUserActionLogInput,
  UpdateUserActionLogInput,
} from './user-action-log.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => UserActionLog)
export class UserActionLogResolver {
  constructor(private service: UserActionLogService) {}

  @Query(() => [UserActionLog])
  async userActionLogs(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() userActionLog: UserActionLog) {
    return this.service.getUser(userActionLog.userId);
  }

  @Query(() => UserActionLog)
  async userActionLog(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserActionLog)
  async createUserActionLog(@Args('data') data: CreateUserActionLogInput) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserActionLogCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserActionLog)
  async updateUserActionLog(
    @Args('id') id: string,
    @Args('data') data: UpdateUserActionLogInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserActionLogUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserActionLog)
  async deleteUserActionLog(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
