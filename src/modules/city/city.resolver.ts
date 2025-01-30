import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CityService } from './city.service';
import { City, CreateCityInput, UpdateCityInput } from './city.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

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
    const { province, ...rest } = data;

    const prismaData: Prisma.CityCreateInput = {
      ...rest,
      province: {
        connect: { id: province },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => City)
  async updateCity(
    @Args('id') id: string,
    @Args('data') data: UpdateCityInput,
  ) {
    const { province, ...rest } = data;

    const prismaData: Prisma.CityUpdateInput = {
      ...rest,
      ...(province && {
        province: {
          connect: { id: province },
        },
      }),
    };
    return this.service.update(id, prismaData);
  }
}
