import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';
import {
  ProductCategory,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from './product-category.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private service: ProductCategoryService) {}

  @Query(() => [ProductCategory])
  async productCategories() {
    return this.service.findAll();
  }

  @Query(() => ProductCategory)
  async productCategory(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => ProductCategory)
  async createProductCategory(@Args('data') data: CreateProductCategoryInput) {
    const { ...rest } = data;

    const prismaData: Prisma.ProductCategoryCreateInput = {
      ...rest,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => ProductCategory)
  async updateProductCategory(@Args('data') data: UpdateProductCategoryInput) {
    const { id, ...rest } = data;

    const prismaData: Prisma.ProductCategoryUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }
}
