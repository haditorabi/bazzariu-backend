import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessProductPriceService } from './business-product-price.service';
import {
  BusinessProductPrice,
  CreateBusinessProductPriceInput,
  UpdateBusinessProductPriceInput,
} from './business-product-price.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => BusinessProductPrice)
export class BusinessProductPriceResolver {
  constructor(private service: BusinessProductPriceService) {}

  @Query(() => [BusinessProductPrice])
  async businessProductPrices(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessProductPrice)
  async businessProductPrice(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessProductPrice)
  async createBusinessProductPrice(
    @Args('data') data: CreateBusinessProductPriceInput,
  ) {
    const { businessProduct, currency, ...rest } = data;

    const prismaData: Prisma.BusinessProductPriceCreateInput = {
      ...rest,
      businessProduct: {
        connect: { id: businessProduct },
      },
      currencyId: currency ? currency : undefined,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessProductPrice)
  async updateBusinessProductPrice(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessProductPriceInput,
  ) {
    const { businessProduct, currency, ...rest } = data;

    const prismaData: Prisma.BusinessProductPriceUpdateInput = {
      ...rest,
      ...(businessProduct && {
        businessBooking: {
          connect: { id: businessProduct },
        },
        currencyId: currency ? currency : undefined,
      }),
    };

    return this.service.update(id, prismaData);
  }
  @ResolveField(() => CommonBusinessProduct)
  async businessProduct(@Parent() businessProductPrice: BusinessProductPrice) {
    return this.service.findOne(businessProductPrice.businessProduct.id);
  }
}
