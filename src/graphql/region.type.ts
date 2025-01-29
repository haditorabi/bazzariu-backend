import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RegionStatus } from '@prisma/client';

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

  @Field({ nullable: true })
  boundry?: string;

  @Field()
  status: RegionStatus;
}
