import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
  async userWallets() {
    return this.service.findAll();
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
  async updateUserWallet(@Args('data') data: UpdateUserWalletInput) {
    const { id, user, ...rest } = data;

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
}
