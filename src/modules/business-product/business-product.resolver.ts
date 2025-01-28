import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessProductService } from './business-product.service';
import {
  BusinessProduct,
  CreateBusinessProductInput,
  UpdateBusinessProductInput,
} from './business-product.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessProduct)
export class BusinessProductResolver {
  constructor(private service: BusinessProductService) {}

  @Query(() => [BusinessProduct])
  async businessProducts() {
    return this.service.findAll();
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
}
