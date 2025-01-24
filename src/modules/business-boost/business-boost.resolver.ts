import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessBoostService } from './business-boost.service';
import {
  BusinessBoost,
  CreateBusinessBoostInput,
  UpdateBusinessBoostInput,
} from './business-boost.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessBoost)
export class BusinessBoostResolver {
  constructor(private service: BusinessBoostService) {}

  @Query(() => [BusinessBoost])
  async businessBoosts() {
    return this.service.findAll();
  }

  @Query(() => BusinessBoost)
  async businessBoost(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessBoost)
  async createBusinessBoost(@Args('data') data: CreateBusinessBoostInput) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessBoostCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessBoost)
  async updateBusinessBoost(@Args('data') data: UpdateBusinessBoostInput) {
    const { id, business, ...rest } = data;

    const prismaData: Prisma.BusinessBoostUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
