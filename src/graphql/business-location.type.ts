import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';

@ObjectType()
export class CommonBusinessLocation {
  @Field(() => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => ID)
  countryId: string;

  @Field(() => ID)
  provinceId: string;

  @Field(() => ID)
  cityId: string;

  @Field(() => ID)
  zipCode: string;

  @Field(() => ID)
  phone: string;

  @Field(() => ID)
  status: BusinessLocationStatus;
}
