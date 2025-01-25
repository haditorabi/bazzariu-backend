import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DealsRedemptionService } from './deal-redemption.service';
import {
  DealsRedemption,
  CreateDealsRedemptionInput,
  UpdateDealsRedemptionInput,
} from './deal-redemption.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => DealsRedemption)
export class DealsRedemptionResolver {
  constructor(private service: DealsRedemptionService) {}

  @Query(() => [DealsRedemption])
  async dealRedemptions() {
    return this.service.findAll();
  }

  @Query(() => DealsRedemption)
  async dealRedemption(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => DealsRedemption)
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
  async updateDealsRedemption(@Args('data') data: UpdateDealsRedemptionInput) {
    const { id, businessDeal, user, ...rest } = data;

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
}
