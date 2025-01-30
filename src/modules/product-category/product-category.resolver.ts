import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';
import {
  ProductCategory,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from './product-category.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private service: ProductCategoryService) {}

  @Query(() => [ProductCategory])
  async productCategories(
    @Args('page', { type: () => Number, nullable: true }) page?: number,
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
  ) {
    return this.service.findAll({ page, limit });
  }
  @ResolveField(() => [CommonBusinessProduct])
  async BusinessProduct(@Parent() category: ProductCategory) {
    const { id } = category;
    return this.service.getBusinessProductsByCategory(id);
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
  async updateProductCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateProductCategoryInput,
  ) {
    const { ...rest } = data;

    const prismaData: Prisma.ProductCategoryUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }
}
