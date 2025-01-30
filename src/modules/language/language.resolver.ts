import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import {
  Language,
  CreateLanguageInput,
  UpdateLanguageInput,
} from './language.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private service: LanguageService) {}

  @Query(() => [Language])
  async languages(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1, // Default to page 1
    @Args('limit', { type: () => Number, nullable: true })
    limit: number = 10, // Default page size
  ) {
    return this.service.findAll(page, limit);
  }

  @Query(() => Language)
  async language(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Language)
  async createLanguage(@Args('data') data: CreateLanguageInput) {
    const prismaData: Prisma.LanguageCreateInput = data;

    return this.service.create(prismaData);
  }

  @Mutation(() => Language)
  async updateLanguage(
    @Args('id') id: string,
    @Args('data') data: UpdateLanguageInput,
  ) {
    const { ...rest } = data;

    const prismaData: Prisma.LanguageUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }
}
