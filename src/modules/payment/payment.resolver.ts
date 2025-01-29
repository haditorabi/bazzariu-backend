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
import { Prisma } from '@prisma/client';
import { CommonPaymentMethod } from 'src/graphql/payment-method.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private service: PaymentService) {}

  @Query(() => [Payment])
  async payments(
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
  ) {
    const skip = (page - 1) * limit; // Calculate skip based on page and limit
    return this.service.findAll(skip, limit); // Pass pagination params
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
  @ResolveField(() => CommonUser)
  async user(@Parent() payment: Payment): Promise<CommonUser> {
    return payment.user;
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() payment: Payment): Promise<CommonBusiness | null> {
    return this.service.findBusinessById(payment.business.id);
  }

  @ResolveField(() => CommonPaymentMethod)
  async paymentMethod(
    @Parent() payment: Payment,
  ): Promise<CommonPaymentMethod> {
    return this.service.findPaymentMethodById(payment.paymentMethod.id);
  }
}
