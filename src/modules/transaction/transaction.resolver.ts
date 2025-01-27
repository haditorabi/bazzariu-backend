import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
} from './transaction.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private service: TransactionService) {}

  @Query(() => [Transaction])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => Transaction)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Transaction)
  async createTransaction(@Args('data') data: CreateTransactionInput) {
    const { payment, business, user, ...rest } = data;

    const prismaData: Prisma.TransactionCreateInput = {
      ...rest,
      payment: {
        connect: { id: payment },
      },
      business: {
        connect: { id: business },
      },
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Transaction)
  async updateTransaction(@Args('data') data: UpdateTransactionInput) {
    const { id, payment, business, user, ...rest } = data;

    const prismaData: Prisma.TransactionUpdateInput = {
      ...rest,
      ...(payment && {
        payment: {
          connect: { id: payment },
        },
      }),
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
