import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessTagService } from './business-tag.service';
import {
  BusinessTag,
  CreateBusinessTagInput,
  UpdateBusinessTagInput,
} from './business-tag.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessTag)
export class BusinessTagResolver {
  constructor(private service: BusinessTagService) {}

  @Query(() => [BusinessTag])
  async businessTags() {
    return this.service.findAll();
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
  async updateBusinessTag(@Args('data') data: UpdateBusinessTagInput) {
    const { id } = data;

    const prismaData: Prisma.BusinessTagUpdateInput = data;

    return this.service.update(id, prismaData);
  }
}
