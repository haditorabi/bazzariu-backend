import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessUpdateService } from './business-update.service';
import {
  BusinessUpdate,
  CreateBusinessUpdateInput,
  UpdateBusinessUpdateInput,
} from './business-update.graphql';
import { Prisma } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

@Resolver(() => BusinessUpdate)
export class BusinessUpdateResolver {
  constructor(private service: BusinessUpdateService) {}

  @Query(() => [BusinessUpdate])
  async businessUpdates(
    @Args('skip', { type: () => Number, nullable: true }) skip?: number,
    @Args('take', { type: () => Number, nullable: true }) take?: number,
  ) {
    return this.service.findAll(skip, take);
  }

  @Query(() => BusinessUpdate)
  async businessUpdate(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessUpdate)
  async createBusinessUpdate(@Args('data') data: CreateBusinessUpdateInput) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateCreateInput = {
      ...rest,
      business: {
        connect: { id: business },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessUpdate)
  async updateBusinessUpdate(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessUpdateInput,
  ) {
    const { business, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateUpdateInput = {
      ...rest,
      ...(business && {
        business: {
          connect: { id: business },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }

  // Resolve related fields (e.g., business)
  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessUpdate: BusinessUpdate) {
    return this.service.getBusiness(businessUpdate.business.id);
  }
}
