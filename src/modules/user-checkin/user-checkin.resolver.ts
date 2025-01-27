import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserCheckinService } from './user-checkin.service';
import {
  UserCheckin,
  CreateUserCheckinInput,
  UpdateUserCheckinInput,
} from './user-checkin.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserCheckin)
export class UserCheckinResolver {
  constructor(private service: UserCheckinService) {}

  @Query(() => [UserCheckin])
  async suerCheckeins() {
    return this.service.findAll();
  }

  @Query(() => UserCheckin)
  async suerCheckein(@Args('id') id: string) {
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
  async updateUserCheckin(@Args('data') data: UpdateUserCheckinInput) {
    const { id, user, business, ...rest } = data;

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
}
