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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedBusinessUpdate } from 'src/graphql/paginated-response';

@Resolver(() => BusinessUpdate)
export class BusinessUpdateResolver {
  constructor(private service: BusinessUpdateService) {}

  @Query(() => [BusinessUpdate])
  async businessUpdates(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedBusinessUpdate)
  async allBusinessUpdate(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => BusinessUpdate)
  async businessUpdate(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BusinessUpdate)
  async createBusinessUpdate(@Args('data') data: CreateBusinessUpdateInput) {
    const { businessId, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateCreateInput = {
      ...rest,
      business: {
        connect: { id: businessId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => BusinessUpdate)
  async updateBusinessUpdate(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessUpdateInput,
  ) {
    const { businessId, ...rest } = data;

    const prismaData: Prisma.BusinessUpdateUpdateInput = {
      ...rest,
      ...(businessId && {
        business: {
          connect: { id: businessId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => BusinessUpdate)
  async deleteBusinessUpdate(@Args('id') id: string) {
    return this.service.delete(id);
  }

  // Resolve related fields (e.g., business)
  @ResolveField(() => CommonBusiness)
  async business(@Parent() businessUpdate: BusinessUpdate) {
    return this.service.getBusiness(businessUpdate.businessId);
  }
}
