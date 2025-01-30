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

@Resolver(() => BusinessProduct)
export class BusinessProductResolver {
  constructor(private service: BusinessProductService) {}

  @Query(() => [BusinessProduct])
  async businessProducts(
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @Args('pageSize', { type: () => Number, nullable: true, defaultValue: 10 })
    pageSize: number,
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Query(() => BusinessProduct)
  async businessProduct(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessProduct)
  async createBusinessProduct(@Args('data') data: CreateBusinessProductInput) {
    const { business, productCategroy, ...rest } = data;

    const prismaData: Prisma.BusinessProductCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
      ...(productCategroy && {
        productCategroy: {
          connect: productCategroy.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessProduct)
  async updateBusinessProduct(@Args('data') data: UpdateBusinessProductInput) {
    const { id, business, productCategroy, ...rest } = data;

    const prismaData: Prisma.BusinessProductUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
      ...(productCategroy && {
        productCategroy: {
          connect: productCategroy.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  // Resolve Fields for related entities

  @ResolveField(() => CommonProductCategory, { nullable: true })
  async productCategroy(@Parent() businessProduct: BusinessProduct) {
    return this.service.getProductCategory(businessProduct.productCategroyId);
  }

  @ResolveField(() => CommonBusinessDeal, { nullable: true })
  async businessDeal(@Parent() businessProduct: BusinessProduct) {
    return this.service.getBusinessDeal([businessProduct.businessDeal.id]);
  }

  @ResolveField(() => CommonBusinessProductPrice, { nullable: true })
  async businessProductPrice(@Parent() businessProduct: BusinessProduct) {
    return this.service.getBusinessProductPrice(businessProduct.id);
  }
}
