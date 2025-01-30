import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessTagService } from './business-tag.service';
import {
  BusinessTag,
  CreateBusinessTagInput,
  UpdateBusinessTagInput,
} from './business-tag.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => BusinessTag)
export class BusinessTagResolver {
  constructor(private service: BusinessTagService) {}

  @Query(() => [BusinessTag])
  async businessTags(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => BusinessTag)
  async businessTag(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessTag)
  async createBusinessTag(@Args('data') data: CreateBusinessTagInput) {
    const prismaData: Prisma.BusinessTagCreateInput = data;
    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessTag)
  async updateBusinessTag(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessTagInput,
  ) {
    const prismaData: Prisma.BusinessTagUpdateInput = data;
    return this.service.update(id, prismaData);
  }
}
