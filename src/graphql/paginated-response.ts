import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Amenity } from 'src/modules/amenity/amenity.graphql';

export function PaginatedResponse<T>(TClass: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TClass])
    items: T[];

    @Field(() => Int)
    totalCount: number;
  }

  return PaginatedResponseClass;
}

@ObjectType()
export class PaginatedAmenities extends PaginatedResponse(Amenity) {}
