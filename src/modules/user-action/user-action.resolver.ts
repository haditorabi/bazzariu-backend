import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserActionService } from './user-action.service';
import {
  UserAction,
  CreateUserActionInput,
  UpdateUserActionInput,
} from './user-action.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserAction)
export class UserActionResolver {
  constructor(private service: UserActionService) {}

  @Query(() => [UserAction])
  async userActions() {
    return this.service.findAll();
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
}
