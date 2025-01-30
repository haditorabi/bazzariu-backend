import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserVerificationService } from './user-verification.service';
import {
  UserVerification,
  CreateUserVerificationInput,
  UpdateUserVerificationInput,
} from './user-verification.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';
@Resolver(() => UserVerification)
export class UserVerificationResolver {
  constructor(private service: UserVerificationService) {}

  @Query(() => [UserVerification])
  async userVerifications(
    @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 })
    skip: number,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
  ) {
    return this.service.findAll({ skip, limit });
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
    @Args('id') id: string,
    @Args('data') data: UpdateUserVerificationInput,
  ) {
    const { user, ...rest } = data;

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
  @ResolveField(() => CommonUser)
  async user(@Parent() userVerification: UserVerification) {
    return this.service.getUserById(userVerification.user.id);
  }
}
