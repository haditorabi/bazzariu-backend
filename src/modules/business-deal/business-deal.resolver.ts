import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessDealService } from './business-deal.service';
import {
  BusinessDeal,
  CreateBusinessDealInput,
  UpdateBusinessDealInput,
} from './business-deal.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessDeal)
export class BusinessDealResolver {
  constructor(private service: BusinessDealService) {}

  @Query(() => [BusinessDeal])
  async businessDeals() {
    return this.service.findAll();
  }

  @Query(() => BusinessDeal)
  async businessDeal(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessDeal)
  async createBusinessDeal(@Args('data') data: CreateBusinessDealInput) {
    const { business, businessProduct, ...rest } = data;

    const prismaData: Prisma.BusinessDealCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
      ...(businessProduct && {
        businessProduct: {
          connect: businessProduct.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessDeal)
  async updateBusinessDeal(@Args('data') data: UpdateBusinessDealInput) {
    const { id, businessProduct, business, ...rest } = data;

    const prismaData: Prisma.BusinessDealUpdateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
      ...(businessProduct && {
        businessProduct: {
          connect: businessProduct.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
