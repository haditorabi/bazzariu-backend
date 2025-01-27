import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPreferenceService } from './user-preference.service';
import {
  UserPreference,
  CreateUserPreferenceInput,
  UpdateUserPreferenceInput,
} from './user-preference.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserPreference)
export class UserPreferenceResolver {
  constructor(private service: UserPreferenceService) {}

  @Query(() => [UserPreference])
  async userPreferences() {
    return this.service.findAll();
  }

  @Query(() => UserPreference)
  async userPreference(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserPreference)
  async createUserPreference(@Args('data') data: CreateUserPreferenceInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserPreferenceCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserPreference)
  async updateUserPreference(@Args('data') data: UpdateUserPreferenceInput) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserPreferenceUpdateInput = {
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
