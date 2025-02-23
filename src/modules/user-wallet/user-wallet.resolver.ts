import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserWalletService } from './user-wallet.service';
import {
  UserWallet,
  CreateUserWalletInput,
  UpdateUserWalletInput,
} from './user-wallet.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedUserWallet } from 'src/graphql/paginated-response';
@Resolver(() => UserWallet)
export class UserWalletResolver {
  constructor(private service: UserWalletService) {}

  @Query(() => [UserWallet])
  async userWallets(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedUserWallet)
  async allUserWallet(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => UserWallet)
  async userWallet(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserWallet)
  async createUserWallet(@Args('data') data: CreateUserWalletInput) {
    const { userId, ...rest } = data;
    const prismaData: Prisma.UserWalletCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => UserWallet)
  async updateUserWallet(
    @Args('id') id: string,
    @Args('data') data: UpdateUserWalletInput,
  ) {
    const { userId, ...rest } = data;
    const prismaData: Prisma.UserWalletUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserWallet)
  async deleteUserWallet(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField()
  async user(@Parent() userWallet: UserWallet) {
    return this.service.findUser(userWallet.userId);
  }
}
