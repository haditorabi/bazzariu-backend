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

@Resolver(() => UserCheckin)
export class UserCheckinResolver {
  constructor(private service: UserCheckinService) {}

  @Query(() => [UserCheckin])
  async userCheckeins(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserCheckin)
  async userCheckein(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserCheckin)
  async createUserCheckin(@Args('data') data: CreateUserCheckinInput) {
    const { user, business, ...rest } = data;

    const prismaData: Prisma.UserCheckinCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserCheckin)
  async updateUserCheckin(
    @Args('id') id: string,
    @Args('data') data: UpdateUserCheckinInput,
  ) {
    const { user, business, ...rest } = data;

    const prismaData: Prisma.UserCheckinUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  // Optional: Add ResolveFields to resolve nested data for `user` and `business`
  @ResolveField(() => CommonUser)
  async user(@Parent() userCheckin: UserCheckin) {
    return this.service.findUser(userCheckin.user.id);
  }

  @ResolveField(() => CommonBusiness)
  async business(@Parent() userCheckin: UserCheckin) {
    return this.service.findBusiness(userCheckin.business.id);
  }
}
