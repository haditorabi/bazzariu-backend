import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import {
  Currency,
  CreateCurrencyInput,
  UpdateCurrencyInput,
} from './currency.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedCurrency } from 'src/graphql/paginated-response';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private service: CurrencyService) {}

  @Query(() => [Currency])
  async currencies(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedCurrency)
  async allCurrency(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => Currency)
  async currency(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Currency)
  async createCurrency(@Args('data') data: CreateCurrencyInput) {
    const prismaData: Prisma.CurrencyCreateInput = data;

    return this.service.create(prismaData);
  }

  @Mutation(() => Currency)
  async updateCurrency(
    @Args('id') id: string,
    @Args('data') data: UpdateCurrencyInput,
  ) {
    const prismaData: Prisma.CurrencyUpdateInput = data;

    return this.service.update(id, prismaData);
  }
  @Mutation(() => Currency)
  async deleteCurrency(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
