import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CityService } from './city.service';
import { City, CreateCityInput, UpdateCityInput } from './city.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonProvince } from 'src/graphql/province.type';

@Resolver(() => City)
export class CityResolver {
  constructor(private service: CityService) {}

  @Query(() => [City])
  async cities(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => City)
  async city(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => City)
  async createCity(@Args('data') data: CreateCityInput) {
    const { provinceId, ...rest } = data;

    const prismaData: Prisma.CityCreateInput = {
      ...rest,
      province: {
        connect: { id: provinceId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => City)
  async updateCity(
    @Args('id') id: string,
    @Args('data') data: UpdateCityInput,
  ) {
    const { provinceId, ...rest } = data;

    const prismaData: Prisma.CityUpdateInput = {
      ...rest,
      ...(provinceId && {
        province: {
          connect: { id: provinceId },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }
  @Mutation(() => City)
  async deleteCity(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonProvince)
  async province(@Parent() city: City) {
    return this.service.getProvince(city.provinceId);
  }
}
