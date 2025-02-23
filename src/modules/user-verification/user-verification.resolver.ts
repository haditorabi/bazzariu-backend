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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedUserVerification } from 'src/graphql/paginated-response';
@Resolver(() => UserVerification)
export class UserVerificationResolver {
  constructor(private service: UserVerificationService) {}

  @Query(() => [UserVerification])
  async userVerifications(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedUserVerification)
  async allUserVerification(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => UserVerification)
  async userVerification(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserVerification)
  async createUserVerification(
    @Args('data') data: CreateUserVerificationInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserVerificationCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserVerification)
  async updateUserVerification(
    @Args('id') id: string,
    @Args('data') data: UpdateUserVerificationInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserVerificationUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserVerification)
  async deleteUserVerification(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() userVerification: UserVerification) {
    return this.service.getUserById(userVerification.userId);
  }
}
