import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessCategoryService } from './business-category.service';
import {
  BusinessCategory,
  CreateBusinessCategoryInput,
  UpdateBusinessCategoryInput,
} from './business-category.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => BusinessCategory)
export class BusinessCategoryResolver {
  constructor(private service: BusinessCategoryService) {}

  @Query(() => [BusinessCategory])
  async businessCategories(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessCategory)
  async businessCategory(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessCategory)
  async createBusinessCategory(
    @Args('data') data: CreateBusinessCategoryInput,
  ) {
    return this.service.create(data);
  }

  @Mutation(() => BusinessCategory)
  async updateBusinessCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessCategoryInput,
  ) {
    const { ...rest } = data;
    return this.service.update(id, { ...rest });
  }

  @Mutation(() => BusinessCategory)
  async deleteBusinessCategory(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
