import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessProductService } from './business-product.service';
import {
  BusinessProduct,
  CreateBusinessProductInput,
  UpdateBusinessProductInput,
} from './business-product.graphql';
import { Prisma } from '@prisma/client';
import { CommonProductCategory } from 'src/graphql/product-category.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProductPrice } from 'src/graphql/business-product-price.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonBusiness } from 'src/graphql/business.type';
import { PaginatedBusinessProduct } from 'src/graphql/paginated-response';

@Resolver(() => BusinessProduct)
export class BusinessProductResolver {
  constructor(private service: BusinessProductService) {}

  @Query(() => [BusinessProduct])
  async businessProducts(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBusinessProduct)
  async allBusinessProduct(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => BusinessProduct)
  async businessProduct(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessProduct)
  async createBusinessProduct(@Args('data') data: CreateBusinessProductInput) {
    const { businessId, productCategroyId, ...rest } = data;

    const prismaData: Prisma.BusinessProductCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
      ...(productCategroyId && {
        productCategroy: {
          connect: productCategroyId.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessProduct)
  async updateBusinessProduct(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessProductInput,
  ) {
    const { businessId, productCategroyId, ...rest } = data;

    const prismaData: Prisma.BusinessProductUpdateInput = {
      ...rest,
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
      ...(productCategroyId && {
        productCategroy: {
          connect: productCategroyId.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  @Mutation(() => BusinessProduct)
  async deleteBusinessProduct(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @ResolveField(() => CommonBusiness, { nullable: true })
  async business(@Parent() businessProduct: BusinessProduct) {
    return this.service.getBusiness(businessProduct.businessId);
  }

  @ResolveField(() => CommonProductCategory, { nullable: true })
  async productCategroy(@Parent() businessProduct: BusinessProduct) {
    return this.service.getProductCategory(businessProduct.productCategroyId);
  }

  @ResolveField(() => CommonBusinessDeal, { nullable: true })
  async businessDeal(@Parent() businessProduct: BusinessProduct) {
    return this.service.getBusinessDeal(businessProduct.businessDealId);
  }

  @ResolveField(() => CommonBusinessProductPrice, { nullable: true })
  async businessProductPrice(@Parent() businessProduct: BusinessProduct) {
    return this.service.getBusinessProductPrice(businessProduct.id);
  }
}
