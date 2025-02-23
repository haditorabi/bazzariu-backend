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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedTransaction } from 'src/graphql/paginated-response';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private service: TransactionService) {}

  @Query(() => [Transaction])
  async transactions(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedTransaction)
  async allTransaction(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @ResolveField(() => CommonPayment)
  async payment(@Parent() transaction: Transaction) {
    return this.service.getPayment(transaction.paymentId);
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() transaction: Transaction) {
    return this.service.getBusiness(transaction.businessId);
  }

  @ResolveField(() => CommonUser)
  async user(@Parent() transaction: Transaction) {
    return this.service.getUser(transaction.userId);
  }

  @Query(() => Transaction)
  async transaction(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Transaction)
  async createTransaction(@Args('data') data: CreateTransactionInput) {
    const { paymentId, businessId, userId, ...rest } = data;

    const prismaData: Prisma.TransactionCreateInput = {
      ...rest,
      payment: {
        connect: { id: paymentId },
      },
      business: {
        connect: { id: businessId },
      },
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @Args('id') id: string,
    @Args('data') data: UpdateTransactionInput,
  ) {
    const { paymentId, businessId, userId, ...rest } = data;

    const prismaData: Prisma.TransactionUpdateInput = {
      ...rest,
      ...(paymentId && {
        payment: {
          connect: { id: paymentId },
        },
      }),
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => Transaction)
  async deleteTransaction(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
