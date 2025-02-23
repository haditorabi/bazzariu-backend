import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import {
  Language,
  CreateLanguageInput,
  UpdateLanguageInput,
} from './language.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedAmenities } from 'src/graphql/paginated-response';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private service: LanguageService) {}

  @Query(() => [Language])
  async languages(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedAmenities)
  async allLanguage(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
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
  @Mutation(() => Language)
  async deleteLanguage(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
