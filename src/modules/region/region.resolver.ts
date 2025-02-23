import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RegionService } from './region.service';
import { Region, CreateRegionInput, UpdateRegionInput } from './region.graphql';
import { Prisma } from '@prisma/client';
import { CommonCountry } from 'src/graphql/country.type';
import { CommonCity } from 'src/graphql/city.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedRegion } from 'src/graphql/paginated-response';

@Resolver(() => Region)
export class RegionResolver {
  constructor(private service: RegionService) {}

  @Query(() => [Region])
  async regions(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedRegion)
  async allRegion(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @ResolveField(() => CommonCountry)
  async country(@Parent() region: Region) {
    return this.service.getCountry(region.countryId);
  }

  @ResolveField(() => CommonCity)
  async city(@Parent() region: Region) {
    return this.service.getCity(region.cityId);
  }

  @Query(() => Region)
  async region(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Region)
  async createRegion(@Args('data') data: CreateRegionInput) {
    const { countryId, cityId, ...rest } = data;

    const prismaData: Prisma.RegionCreateInput = {
      ...rest,
      country: {
        connect: { id: countryId },
      },
      city: {
        connect: { id: cityId },
      },
      boundry: rest.boundry as string,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Region)
  async updateRegion(
    @Args('id') id: string,

    @Args('data') data: UpdateRegionInput,
  ) {
    const { countryId, cityId, boundry, ...rest } = data;

    const prismaData: Prisma.RegionUpdateInput = {
      ...rest,
      ...(countryId && {
        country: {
          connect: { id: countryId },
        },
      }),
      ...(cityId && {
        city: {
          connect: { id: cityId },
        },
      }),
      ...(boundry && {
        boundry: boundry as unknown,
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => Region)
  async deleteRegion(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
