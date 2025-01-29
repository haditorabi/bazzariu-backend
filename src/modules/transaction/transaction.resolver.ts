import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
} from './transaction.graphql';
import { Prisma } from '@prisma/client';
import { CommonPayment } from 'src/graphql/payment.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private service: TransactionService) {}

  @Query(() => [Transaction])
  async bookingTimeSlots(
    @Args('skip', { type: () => Number, nullable: true }) skip?: number,
    @Args('take', { type: () => Number, nullable: true }) take?: number,
  ) {
    return this.service.findAll(skip, take);
  }

  @ResolveField(() => CommonPayment)
  async payment(@Parent() transaction: Transaction) {
    return this.service.getPayment(transaction.payment.id);
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() transaction: Transaction) {
    return transaction.business.id
      ? this.service.getBusiness(transaction.business.id)
      : null;
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() transaction: Transaction) {
    return this.service.getUser(transaction.user.id);
  }

  @Query(() => Transaction)
  async transaction(@Args('id') id: string) {
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
