import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProvinceService } from './province.service';
import {
  Province,
  CreateProvinceInput,
  UpdateProvinceInput,
} from './province.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(private service: ProvinceService) {}

  @Query(() => [Province])
  async provinces() {
    return this.service.findAll();
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
  async updateProvince(@Args('data') data: UpdateProvinceInput) {
    const { id, country, ...rest } = data;

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
}
