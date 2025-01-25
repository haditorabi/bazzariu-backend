import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentMethodService } from './payment-method.service';
import {
  PaymentMethod,
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from './payment-method.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private service: PaymentMethodService) {}

  @Query(() => [PaymentMethod])
  async paymentMethods() {
    return this.service.findAll();
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
  async updatePaymentMethod(@Args('data') data: UpdatePaymentMethodInput) {
    const { id, user, ...rest } = data;

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
