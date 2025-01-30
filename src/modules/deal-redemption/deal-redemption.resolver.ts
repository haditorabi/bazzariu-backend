import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DealsRedemptionService } from './deal-redemption.service';
import {
  DealsRedemption,
  CreateDealsRedemptionInput,
  UpdateDealsRedemptionInput,
} from './deal-redemption.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonUser } from 'src/graphql/user.type';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => DealsRedemption)
export class DealsRedemptionResolver {
  constructor(private service: DealsRedemptionService) {}

  @Query(() => [DealsRedemption])
  @ServiceErrorHandler('fetch all deal redemptions')
  async dealRedemptions(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => DealsRedemption)
  @ServiceErrorHandler('fetch deal redemption by ID')
  async dealRedemption(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => DealsRedemption)
  @ServiceErrorHandler('create deal redemption')
  async createDealsRedemption(@Args('data') data: CreateDealsRedemptionInput) {
    const { businessDeal, user, ...rest } = data;

    const prismaData: Prisma.DealsRedemptionCreateInput = {
      ...rest,
      businessDeal: {
        connect: { id: businessDeal },
      },
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => DealsRedemption)
  @ServiceErrorHandler('update deal redemption')
  async updateDealsRedemption(
    @Args('id') id: string,
    @Args('data') data: UpdateDealsRedemptionInput,
  ) {
    const { businessDeal, user, ...rest } = data;

    const prismaData: Prisma.DealsRedemptionUpdateInput = {
      ...rest,
      ...(businessDeal && {
        businessDeal: {
          connect: { id: businessDeal },
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

  // ResolveField for businessDeal
  @ResolveField(() => CommonBusinessDeal)
  async businessDeal(@Parent() dealRedemption: DealsRedemption) {
    return this.service.getBusinessDeal(dealRedemption.businessDeal.id);
  }

  // ResolveField for user
  @ResolveField(() => CommonUser)
  async user(@Parent() dealRedemption: DealsRedemption) {
    return this.service.getUser(dealRedemption.user.id);
  }
}
