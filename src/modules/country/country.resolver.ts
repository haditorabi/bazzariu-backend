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

@Resolver(() => Country)
export class CountryResolver {
  constructor(
    private service: CountryService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Country])
  async countries() {
    return this.service.findAll();
  }

  @Query(() => Country)
  async country(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @ResolveField(() => [CommonProvince], { nullable: true })
  async province(@Root() country: Country): Promise<CommonProvince[] | null> {
    return this.prisma.province.findMany({
      where: { countryId: country.id },
    });
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
