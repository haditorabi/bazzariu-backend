import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import {
  Currency,
  CreateCurrencyInput,
  UpdateCurrencyInput,
} from './currency.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private service: CurrencyService) {}

  @Query(() => [Currency])
  async currencies(
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
  ) {
    return this.service.findAll(page, limit);
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
  async updateCurrency(@Args('data') data: UpdateCurrencyInput) {
    const { id } = data;

    const prismaData: Prisma.CurrencyUpdateInput = data;

    return this.service.update(id, prismaData);
  }
}
