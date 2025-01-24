import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountryService } from './country.service';
import {
  Country,
  CreateCountryInput,
  UpdateCountryInput,
} from './country.graphql';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private service: CountryService) {}

  @Query(() => [Country])
  async countries() {
    return this.service.findAll();
  }

  @Query(() => Country)
  async country(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Country)
  async createCountry(@Args('data') data: CreateCountryInput) {
    return this.service.create(data);
  }

  @Mutation(() => Country)
  async updateCountry(@Args('data') data: UpdateCountryInput) {
    const { id, ...rest } = data;

    return this.service.update(id, { ...rest });
  }
}
