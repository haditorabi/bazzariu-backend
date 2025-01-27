import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegionService } from './region.service';
import { Region, CreateRegionInput, UpdateRegionInput } from './region.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Region)
export class RegionResolver {
  constructor(private service: RegionService) {}

  @Query(() => [Region])
  async regions() {
    return this.service.findAll();
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
      boundry: rest.boundry as unknown as Prisma.InputJsonValue,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Region)
  async updateRegion(@Args('data') data: UpdateRegionInput) {
    const { id, country, city, boundry, ...rest } = data;

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
        boundry: boundry as unknown as Prisma.InputJsonValue,
      }),
    };

    return this.service.update(id, prismaData);
  }
}
