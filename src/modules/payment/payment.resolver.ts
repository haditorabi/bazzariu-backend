import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import {
  Payment,
  CreatePaymentInput,
  UpdatePaymentInput,
} from './payment.graphql';
import { Business, Prisma, User } from '@prisma/client';
import { CommonPaymentMethod } from 'src/graphql/payment-method.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedPayment } from 'src/graphql/paginated-response';
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private service: PaymentService) {}

  @Query(() => [Payment])
  async payments(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs); // Pass pagination params
  }
  @Query(() => PaginatedPayment)
  async allPayment(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => Payment)
  async payment(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Payment)
  async createPayment(@Args('data') data: CreatePaymentInput) {
    const { userId, businessId, paymentMethodId, ...rest } = data;

    const prismaData: Prisma.PaymentCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
      paymentMethod: {
        connect: { id: paymentMethodId },
      },
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => Payment)
  async updatePayment(
    @Args('id') id: string,
    @Args('data') data: UpdatePaymentInput,
  ) {
    const { userId, businessId, paymentMethodId, ...rest } = data;

    const prismaData: Prisma.PaymentUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
      ...(paymentMethodId && {
        paymentMethod: {
          connect: { id: paymentMethodId },
        },
      }),
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => Payment)
  async deletePayment(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() payment: Payment): Promise<User> {
    return this.service.findUserById(payment.userId);
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() payment: Payment): Promise<Business | null> {
    return this.service.findBusinessById(payment.businessId);
  }

  @ResolveField(() => CommonPaymentMethod)
  async paymentMethod(
    @Parent() payment: Payment,
  ): Promise<CommonPaymentMethod> {
    return this.service.findPaymentMethodById(payment.paymentMethodId);
  }
}
