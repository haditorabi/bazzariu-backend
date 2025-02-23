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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedProductCategory } from 'src/graphql/paginated-response';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private service: ProductCategoryService) {}

  @Query(() => [ProductCategory])
  async productCategories(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedProductCategory)
  async allProductCategory(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
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
  @Mutation(() => ProductCategory)
  async deleteProductCategory(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
