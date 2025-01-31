import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PaymentMethodService } from './payment-method.service';
import {
  PaymentMethod,
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from './payment-method.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonUser } from 'src/graphql/user.type';
import { CommonPayment } from 'src/graphql/payment.type';

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
  @Mutation(() => PaymentMethod)
  async deletePaymentMethod(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => [CommonPayment])
  async payment(@Parent() paymentMethod: PaymentMethod) {
    return this.service.getPayments(paymentMethod.id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() paymentMethod: PaymentMethod) {
    return this.service.getUser(paymentMethod.userId);
  }
}
