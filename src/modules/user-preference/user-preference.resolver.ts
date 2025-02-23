import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserPreferenceService } from './user-preference.service';
import {
  UserPreference,
  CreateUserPreferenceInput,
  UpdateUserPreferenceInput,
} from './user-preference.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonUser } from 'src/graphql/user.type';
import { PaginatedUserPreference } from 'src/graphql/paginated-response';

@Resolver(() => UserPreference)
export class UserPreferenceResolver {
  constructor(private service: UserPreferenceService) {}

  @Query(() => [UserPreference])
  async userPreferences(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedUserPreference)
  async allUserPreference(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => UserPreference)
  async userPreference(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserPreference)
  async createUserPreference(@Args('data') data: CreateUserPreferenceInput) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserPreferenceCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserPreference)
  async updateUserPreference(
    @Args('id') id: string,
    @Args('data') data: UpdateUserPreferenceInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserPreferenceUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserPreference)
  async deleteUserPreference(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() userPreference: UserPreference) {
    return this.service.getUser(userPreference.userId);
  }
}
