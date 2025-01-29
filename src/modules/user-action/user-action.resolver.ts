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

@Resolver(() => UserAction)
export class UserActionResolver {
  constructor(private service: UserActionService) {}

  @Query(() => [UserAction])
  async userActions(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ) {
    return this.service.findAll({ page, limit });
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
  async updateUserAction(@Args('data') data: UpdateUserActionInput) {
    const { id, user, ...rest } = data;

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
  @ResolveField(() => CommonUser)
  async user(@Parent() userAction: UserAction): Promise<User> {
    const { userId } = userAction;
    return this.service.getUser(userId);
  }
}
