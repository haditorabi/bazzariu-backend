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

@Resolver(() => Region)
export class RegionResolver {
  constructor(private service: RegionService) {}

  @Query(() => [Region])
  async regions(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @ResolveField(() => CommonCountry)
  async country(@Parent() region: Region) {
    return this.service.getCountry(region.country.id);
  }

  @ResolveField(() => CommonCity)
  async city(@Parent() region: Region) {
    return this.service.getCity(region.city.id);
  }

  @Query(() => Region)
  async region(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Region)
  async createRegion(@Args('data') data: CreateRegionInput) {
    const { country, city, ...rest } = data;

    const prismaData: Prisma.RegionCreateInput = {
      ...rest,
      country: {
        connect: { id: country },
      },
      city: {
        connect: { id: city },
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
    const { country, city, boundry, ...rest } = data;

    const prismaData: Prisma.RegionUpdateInput = {
      ...rest,
      ...(country && {
        country: {
          connect: { id: country },
        },
      }),
      ...(city && {
        city: {
          connect: { id: city },
        },
      }),
      ...(boundry && {
        boundry: boundry as unknown,
      }),
    };

    return this.service.update(id, prismaData);
  }
}
