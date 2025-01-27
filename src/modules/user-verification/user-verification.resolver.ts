import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserVerificationService } from './user-verification.service';
import {
  UserVerification,
  CreateUserVerificationInput,
  UpdateUserVerificationInput,
} from './user-verification.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserVerification)
export class UserVerificationResolver {
  constructor(private service: UserVerificationService) {}

  @Query(() => [UserVerification])
  async userVerifications() {
    return this.service.findAll();
  }

  @Query(() => UserVerification)
  async userVerification(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserVerification)
  async createUserVerification(
    @Args('data') data: CreateUserVerificationInput,
  ) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserVerificationCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserVerification)
  async updateUserVerification(
    @Args('data') data: UpdateUserVerificationInput,
  ) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserVerificationUpdateInput = {
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
