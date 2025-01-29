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
import { PrismaService } from '../prisma/prisma.service';
import { CommonProvince } from 'src/graphql/province.type';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Resolver(() => Country)
export class CountryResolver {
  constructor(
    private service: CountryService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Country])
  @ServiceErrorHandler('findAll countries') // Error handling
  async countries(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true })
    limit: number = 10,
  ) {
    return this.service.findAll({ page, limit });
  }

  @Query(() => Country)
  @ServiceErrorHandler('find country') // Error handling
  async country(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @ResolveField(() => [CommonProvince], { nullable: true })
  @ServiceErrorHandler('findProvincesByCountryId') // Error handling
  async province(
    @Root() country: Country,
    @Args('page', { nullable: true }) page: number = 1,
    @Args('limit', { nullable: true }) limit: number = 10,
  ): Promise<CommonProvince[] | null> {
    return this.service.findProvincesByCountryId(country.id, {
      page,
      limit,
    });
  }

  @Mutation(() => Country)
  @ServiceErrorHandler('create country') // Error handling
  async createCountry(@Args('data') data: CreateCountryInput) {
    return this.service.create(data);
  }

  @Mutation(() => Country)
  @ServiceErrorHandler('update country') // Error handling
  async updateCountry(@Args('data') data: UpdateCountryInput) {
    const { id, ...rest } = data;
    return this.service.update(id, { ...rest });
  }

  @Query(() => [CommonProvince])
  @ServiceErrorHandler('findAll provinces') // Error handling
  async provinces(
    @Args('countryId') countryId: string,
    @Args('page', { nullable: true }) page: number = 1,
    @Args('limit', { nullable: true }) limit: number = 10,
  ) {
    return this.service.findProvincesByCountryId(countryId, { page, limit });
  }
}
