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
import { PaginatedBusinessProductPrice } from 'src/graphql/paginated-response';

@Resolver(() => BusinessProductPrice)
export class BusinessProductPriceResolver {
  constructor(private service: BusinessProductPriceService) {}

  @Query(() => [BusinessProductPrice])
  async businessProductPrices(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBusinessProductPrice)
  async allBusinessProductPrice(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => BusinessProductPrice)
  async businessProductPrice(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessProductPrice)
  async createBusinessProductPrice(
    @Args('data') data: CreateBusinessProductPriceInput,
  ) {
    const { businessProductId, currencyId, ...rest } = data;

    const prismaData: Prisma.BusinessProductPriceCreateInput = {
      ...rest,
      businessProduct: {
        connect: { id: businessProductId },
      },
      currencyId: currencyId ? currencyId : undefined,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessProductPrice)
  async updateBusinessProductPrice(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessProductPriceInput,
  ) {
    const { businessProductId, currencyId, ...rest } = data;

    const prismaData: Prisma.BusinessProductPriceUpdateInput = {
      ...rest,
      ...(businessProductId && {
        businessProduct: {
          connect: { id: businessProductId },
        },
        currencyId: currencyId ? currencyId : undefined,
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => BusinessProductPrice)
  async deleteBusinessProductPrice(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonBusinessProduct)
  async businessProduct(@Parent() businessProductPrice: BusinessProductPrice) {
    return this.service.getBusinessProduct(
      businessProductPrice.businessProductId,
    );
  }
}
