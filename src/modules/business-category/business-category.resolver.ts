import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessCategoryService } from './business-category.service';
import {
  BusinessCategory,
  CreateBusinessCategoryInput,
  UpdateBusinessCategoryInput,
} from './business-category.graphql';

@Resolver(() => BusinessCategory)
export class BusinessCategoryResolver {
  constructor(private service: BusinessCategoryService) {}

  @Query(() => [BusinessCategory])
  async businessCategories() {
    return this.service.findAll();
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
    @Args('data') data: UpdateBusinessCategoryInput,
  ) {
    const { id } = data;

    return this.service.update(id, data);
  }
}
