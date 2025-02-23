import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessDealService } from './business-deal.service';
import {
  BusinessDeal,
  CreateBusinessDealInput,
  UpdateBusinessDealInput,
} from './business-deal.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { CommonBusiness } from 'src/graphql/business.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { NotFoundException } from '@nestjs/common';
import { PaginatedBusinessDeal } from 'src/graphql/paginated-response';

@Resolver(() => BusinessDeal)
export class BusinessDealResolver {
  constructor(private service: BusinessDealService) {}

  @Query(() => [BusinessDeal])
  async businessDeals(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBusinessDeal)
  async allBusinessDeal(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => BusinessDeal)
  async businessDeal(@Args('id') id: string) {
    const businessDeal = await this.service.findOne(id);
    if (!businessDeal) {
      throw new NotFoundException('businessDeal not found');
    }

    return businessDeal;
  }

  @Mutation(() => BusinessDeal)
  async createBusinessDeal(@Args('data') data: CreateBusinessDealInput) {
    const { businessId, businessProductId, ...rest } = data;

    const prismaData: Prisma.BusinessDealCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
      ...(businessProductId && {
        businessProduct: {
          connect: businessProductId.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessDeal)
  async updateBusinessDeal(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessDealInput,
  ) {
    const { businessProductId, businessId, ...rest } = data;

    const prismaData: Prisma.BusinessDealUpdateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
      ...(businessProductId && {
        businessProduct: {
          connect: businessProductId.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => BusinessDeal)
  async deleteBusinessDeal(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessDeal: BusinessDeal) {
    return this.service.getBusinessById(businessDeal.businessId);
  }

  @ResolveField(() => [CommonBusinessProduct])
  async businessProduct(@Parent() businessDeal: BusinessDeal) {
    return this.service.getBusinessProducts(
      businessDeal.businessProduct.map((product) => product.id),
    );
  }
}
