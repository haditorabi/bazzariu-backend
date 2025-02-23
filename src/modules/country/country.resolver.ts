import {
  Resolver,
  Query,
  Mutation,
  Args,
  Root,
  ResolveField,
} from '@nestjs/graphql';
import { CountryService } from './country.service';
import {
  Country,
  CreateCountryInput,
  UpdateCountryInput,
} from './country.graphql';
import { CommonProvince } from 'src/graphql/province.type';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedCountry } from 'src/graphql/paginated-response';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private service: CountryService) {}

  @Query(() => [Country])
  @ServiceErrorHandler('findAll countries') // Error handling
  async countries(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedCountry)
  async allCountry(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => Country)
  @ServiceErrorHandler('find country') // Error handling
  async country(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @ResolveField(() => [CommonProvince], { nullable: true })
  @ServiceErrorHandler('findProvincesByCountryId') // Error handling
  async province(@Root() country: Country): Promise<CommonProvince[] | null> {
    return this.service.findProvincesByCountryId(country.id);
  }

  @Mutation(() => Country)
  @ServiceErrorHandler('create country') // Error handling
  async createCountry(@Args('data') data: CreateCountryInput) {
    return this.service.create(data);
  }

  @Mutation(() => Country)
  @ServiceErrorHandler('update country') // Error handling
  async updateCountry(
    @Args('id') id: string,
    @Args('data') data: UpdateCountryInput,
  ) {
    const { ...rest } = data;
    return this.service.update(id, { ...rest });
  }
  @Mutation(() => Country)
  async deleteCountry(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @Query(() => [CommonProvince])
  @ServiceErrorHandler('findAll provinces') // Error handling
  async provinces(@Args('countryId') countryId: string) {
    return this.service.findProvincesByCountryId(countryId);
  }
}
