import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentMethodService } from './payment-method.service';
import {
  PaymentMethod,
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from './payment-method.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private service: PaymentMethodService) {}

  @Query(() => [PaymentMethod])
  async paymentMethods(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => PaymentMethod)
  async paymentMethod(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  async createPaymentMethod(@Args('data') data: CreatePaymentMethodInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.PaymentMethodCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => PaymentMethod)
  async updatePaymentMethod(
    @Args('id') id: string,
    @Args('data') data: UpdatePaymentMethodInput,
  ) {
    const { user, ...rest } = data;

    const prismaData: Prisma.PaymentMethodUpdateInput = {
      ...rest,
      ...(user && {
        businessBooking: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
