import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RegionStatus } from '@prisma/client';
@ObjectType()
class Boundry {
  @Field()
  longtitude: string;

  @Field()
  latitude: string;
}

@ObjectType()
export class CommonRegion {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  countryId: string;

  @Field(() => ID)
  cityId: string;

  @Field(() => Boundry, { nullable: true })
  boundry?: Boundry;

  @Field()
  status: RegionStatus;
}
