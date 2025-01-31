import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Prisma, User } from '@prisma/client';
import {
  CreateUserActionInput,
  UpdateUserActionInput,
  UserAction,
} from './user-action.graphql';
import { UserActionService } from './user-action.service';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => UserAction)
export class UserActionResolver {
  constructor(private service: UserActionService) {}

  @Query(() => [UserAction])
  async userActions(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserAction)
  async userAction(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserAction)
  async createUserAction(@Args('data') data: CreateUserActionInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserActionCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserAction)
  async updateUserAction(
    @Args('id') id: string,
    @Args('data') data: UpdateUserActionInput,
  ) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserActionUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserAction)
  async deleteUserAction(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() userAction: UserAction): Promise<User> {
    return this.service.getUser(userAction.userId);
  }
}
