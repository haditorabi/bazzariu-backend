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

@Resolver(() => UserActionLog)
export class UserActionLogResolver {
  constructor(private service: UserActionLogService) {}

  @Query(() => [UserActionLog])
  async userActionLogs(
    @Args('skip', { type: () => Number, nullable: true }) skip?: number,
    @Args('take', { type: () => Number, nullable: true }) take?: number,
  ) {
    return this.service.findAll({ skip, take });
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() userActionLog: UserActionLog) {
    const { userId } = userActionLog;
    return this.service.getUser(userId);
  }

  @Query(() => UserActionLog)
  async userActionLog(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserActionLog)
  async createUserActionLog(@Args('data') data: CreateUserActionLogInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserActionLogCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserActionLog)
  async updateUserActionLog(@Args('data') data: UpdateUserActionLogInput) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserActionLogUpdateInput = {
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
