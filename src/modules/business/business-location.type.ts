import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';

@ObjectType()
export class BusinessLocation {
  @Field(() => ID)
  id: string;

  @Field()
  adress: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => ID)
  countryId: string;

  @Field(() => ID)
  privinceId: string;

  @Field(() => ID)
  cityId: string;

  @Field(() => ID)
  zipCode: string;

  @Field(() => ID)
  phone: string;

  @Field(() => ID)
  status: BusinessLocationStatus;
}
