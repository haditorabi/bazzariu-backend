import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProvinceService } from './province.service';
import {
  Province,
  CreateProvinceInput,
  UpdateProvinceInput,
} from './province.graphql';
import { Prisma } from '@prisma/client';
import { CommonCountry } from 'src/graphql/country.type';
import { CommonCity } from 'src/graphql/city.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(private service: ProvinceService) {}

  @Query(() => [Province])
  async provinces(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Province)
  async province(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Province)
  async createProvince(@Args('data') data: CreateProvinceInput) {
    const { country, ...rest } = data;

    const prismaData: Prisma.ProvinceCreateInput = {
      ...rest,
      country: {
        connect: { id: country },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Province)
  async updateProvince(
    @Args('id') id: string,
    @Args('data') data: UpdateProvinceInput,
  ) {
    const { country, ...rest } = data;

    const prismaData: Prisma.ProvinceUpdateInput = {
      ...rest,
      ...(country && {
        country: {
          connect: { id: country },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @ResolveField(() => [CommonCity])
  async city(@Parent() province: Province) {
    const { id } = province;
    return this.service.getCitiesForProvince(id);
  }

  @ResolveField(() => CommonCountry)
  async country(@Parent() province: Province) {
    const { country } = province;
    return this.service.getCountry(country.id);
  }
  @Mutation(() => CommonCountry)
  async deleteProvince(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
