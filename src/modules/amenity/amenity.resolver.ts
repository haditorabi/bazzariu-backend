import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AmenityService } from './amenity.service';
import {
  Amenity,
  CreateAmenityInput,
  UpdateAmenityInput,
} from './amenity.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => Amenity)
export class AmenityResolver {
  constructor(private service: AmenityService) {}

  @Query(() => [Amenity])
  async amenities(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Amenity)
  async amenity(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Amenity)
  async createAmenity(@Args('data') data: CreateAmenityInput) {
    return this.service.create(data);
  }

  @Mutation(() => Amenity)
  async updateAmenity(
    @Args('id') id: string,
    @Args('data') data: UpdateAmenityInput,
  ) {
    return this.service.update(id, data);
  }
  @Mutation(() => Amenity)
  async deleteAmenity(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
