import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import {
  Business,
  CreateBusinessInput,
  UpdateBusinessInput,
} from './business.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Business)
export class BusinessResolver {
  constructor(private service: BusinessService) {}

  @Query(() => [Business])
  async busiensses() {
    return this.service.findAll();
  }

  @Query(() => Business)
  async busienss(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Business)
  async createBusiness(@Args('data') data: CreateBusinessInput) {
    const { amenity, businessCategory, region, ...rest } = data;

    const prismaData: Prisma.BusinessCreateInput = {
      ...rest,
      region: {
        connect: { id: region },
      },
      ...(businessCategory && {
        businessCategory: {
          connect: businessCategory.map((id) => ({ id })),
        },
      }),
      ...(amenity && {
        amenity: {
          connect: amenity.map((id) => ({ id })),
        },
      }),
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Business)
  async updateBusiness(@Args('data') data: UpdateBusinessInput) {
    const { id, amenity, businessCategory, region, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateInput = {
      ...rest,
      ...(region && {
        region: {
          connect: { id: region },
        },
      }),
      ...(businessCategory && {
        businessCategory: {
          connect: businessCategory.map((id) => ({ id })),
        },
      }),
      ...(amenity && {
        amenity: {
          connect: amenity.map((id) => ({ id })),
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
