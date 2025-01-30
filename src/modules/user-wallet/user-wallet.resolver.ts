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
@Resolver(() => UserWallet)
export class UserWalletResolver {
  constructor(private service: UserWalletService) {}

  @Query(() => [UserWallet])
  async userWallets(
    @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 })
    skip: number,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
  ) {
    return this.service.findAll({ skip, limit });
  }

  @Query(() => UserWallet)
  async userWallet(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserWallet)
  async createUserWallet(@Args('data') data: CreateUserWalletInput) {
    const { user, ...rest } = data;
    const prismaData: Prisma.UserWalletCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => UserWallet)
  async updateUserWallet(
    @Args('id') id: string,
    @Args('data') data: UpdateUserWalletInput,
  ) {
    const { user, ...rest } = data;
    const prismaData: Prisma.UserWalletUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }

  @ResolveField()
  async user(@Parent() userWallet: UserWallet) {
    return this.service.findUser(userWallet.user.id);
  }
}
