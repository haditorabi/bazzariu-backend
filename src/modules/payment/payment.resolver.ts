import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import {
  Payment,
  CreatePaymentInput,
  UpdatePaymentInput,
} from './payment.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private service: PaymentService) {}

  @Query(() => [Payment])
  async payments() {
    return this.service.findAll();
  }

  @Query(() => Payment)
  async payment(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Payment)
  async createPayment(@Args('data') data: CreatePaymentInput) {
    const { user, business, paymentMethod, ...rest } = data;

    const prismaData: Prisma.PaymentCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
      paymentMethod: {
        connect: { id: paymentMethod },
      },
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Payment)
  async updatePayment(@Args('data') data: UpdatePaymentInput) {
    const { id, user, business, paymentMethod, ...rest } = data;

    const prismaData: Prisma.PaymentUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
      ...(paymentMethod && {
        paymentMethod: {
          connect: { id: paymentMethod },
        },
      }),
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
