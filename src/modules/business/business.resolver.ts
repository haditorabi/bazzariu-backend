import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BusinessService } from './business.service';
import {
  Business,
  CreateBusinessInput,
  UpdateBusinessInput,
} from './business.graphql';
import { BusinessHour, BusinessLocation, Prisma } from '@prisma/client';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';
import { CommonRegion } from 'src/graphql/region.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { CommonBusinessHour } from 'src/graphql/business-hour.type';
import { CommonBusinessLocation } from 'src/graphql/business-location.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => Business)
export class BusinessResolver {
  constructor(private service: BusinessService) {}

  @Query(() => [Business])
  async businesses(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Business[]> {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Int)
  async totalBusinesses(): Promise<number> {
    return this.service.count();
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
  async updateBusiness(
    @Args('id') id: string,
    @Args('data') data: UpdateBusinessInput,
  ) {
    const { amenity, businessCategory, region, ...rest } = data;

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
  @Mutation(() => Boolean)
  async deleteBusiness(@Args('id') id: string): Promise<boolean> {
    await this.service.delete(id);
    return true;
  }
  @ResolveField(() => CommonRegion, { nullable: true })
  async region(@Parent() business: Business): Promise<CommonRegion | null> {
    return this.service.getRegion(business.id);
  }

  @ResolveField(() => [CommonBusinessBooking], { nullable: true })
  async businessBooking(
    @Parent() business: Business,
  ): Promise<CommonBusinessBooking[] | null> {
    return this.service.getBusinessBookings(business.id);
  }

  @ResolveField(() => [CommonBusinessDeal], { nullable: true })
  async businessDeal(
    @Parent() business: Business,
  ): Promise<CommonBusinessDeal[] | null> {
    return this.service.getBusinessDeals(business.id);
  }

  @ResolveField(() => [CommonBusinessHour], { nullable: true })
  async businessHour(
    @Parent() business: Business,
  ): Promise<BusinessHour[] | null> {
    return this.service.getBusinessHours(business.id);
  }

  @ResolveField(() => [CommonBusinessLocation], { nullable: true })
  async businessLocation(
    @Parent() business: Business,
  ): Promise<BusinessLocation[] | null> {
    return this.service.getBusinessLocations(business.id);
  }

  @ResolveField(() => [CommonBusinessProduct], { nullable: true })
  async businessProduct(
    @Parent() business: Business,
  ): Promise<CommonBusinessProduct[] | null> {
    return this.service.getBusinessProducts(business.id);
  }
}
