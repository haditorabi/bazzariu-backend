import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessLocationService } from './business-location.service';
import {
  BusinessLocation,
  CreateBusinessLocationInput,
  UpdateBusinessLocationInput,
} from './business-location.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => BusinessLocation)
export class BusinessLocationResolver {
  constructor(private service: BusinessLocationService) {}

  @Query(() => [BusinessLocation])
  async businessLocations(
    @Args('skip', { type: () => Number, nullable: true }) skip?: number,
    @Args('take', { type: () => Number, nullable: true }) take?: number,
  ) {
    return this.service.findAll({ skip, take });
  }

  @Query(() => BusinessLocation)
  async businessLocation(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessLocation)
  async createBusinessLocation(
    @Args('data') data: CreateBusinessLocationInput,
  ) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessLocationCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessLocation)
  async updateBusinessLocation(
    @Args('data') data: UpdateBusinessLocationInput,
  ) {
    const { id, business, ...rest } = data;

    const prismaData: Prisma.BusinessLocationUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  @ResolveField(() => String, { nullable: true })
  async business(@Parent() businessLocation: BusinessLocation) {
    // Example: resolve the business associated with the location
    return this.service.getBusiness(businessLocation.business.id);
  }
}
