import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserCheckinService } from './user-checkin.service';
import {
  UserCheckin,
  CreateUserCheckinInput,
  UpdateUserCheckinInput,
} from './user-checkin.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedUserCheckin } from 'src/graphql/paginated-response';

@Resolver(() => UserCheckin)
export class UserCheckinResolver {
  constructor(private service: UserCheckinService) {}

  @Query(() => [UserCheckin])
  async userCheckins(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedUserCheckin)
  async allUserCheckin(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => UserCheckin)
  async userCheckin(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserCheckin)
  async createUserCheckin(@Args('data') data: CreateUserCheckinInput) {
    const { userId, businessId, ...rest } = data;

    const prismaData: Prisma.UserCheckinCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
      business: {
        connect: { id: businessId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserCheckin)
  async updateUserCheckin(
    @Args('id') id: string,
    @Args('data') data: UpdateUserCheckinInput,
  ) {
    const { userId, businessId, ...rest } = data;

    const prismaData: Prisma.UserCheckinUpdateInput = {
      ...rest,
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserCheckin)
  async deleteUserCheckin(@Args('id') id: string) {
    return this.service.delete(id);
  }
  // Optional: Add ResolveFields to resolve nested data for `user` and `business`
  @ResolveField(() => CommonUser)
  async user(@Parent() userCheckin: UserCheckin) {
    return this.service.findUser(userCheckin.userId);
  }

  @ResolveField(() => CommonBusiness)
  async business(@Parent() userCheckin: UserCheckin) {
    return this.service.findBusiness(userCheckin.businessId);
  }
}
