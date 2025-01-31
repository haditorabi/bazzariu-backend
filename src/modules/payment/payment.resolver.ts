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
import { Business, Prisma } from '@prisma/client';
import { CommonPaymentMethod } from 'src/graphql/payment-method.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private service: PaymentService) {}

  @Query(() => [Payment])
  async payments(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs); // Pass pagination params
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
  async updatePayment(
    @Args('id') id: string,
    @Args('data') data: UpdatePaymentInput,
  ) {
    const { user, business, paymentMethod, ...rest } = data;

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
  @ResolveField(() => CommonUser)
  async user(@Parent() payment: Payment): Promise<CommonUser> {
    return payment.user;
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() payment: Payment): Promise<Business | null> {
    return this.service.findBusinessById(payment.business.id);
  }

  @ResolveField(() => CommonPaymentMethod)
  async paymentMethod(
    @Parent() payment: Payment,
  ): Promise<CommonPaymentMethod> {
    return this.service.findPaymentMethodById(payment.paymentMethod.id);
  }
}
