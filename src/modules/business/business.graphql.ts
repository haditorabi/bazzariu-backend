import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { BusinessBooking } from './business-booking.type';
import { BusinessHour } from './business-hour.type';
import { BusinessLocation } from './business-location.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonRegion } from 'src/graphql/region.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';

@ObjectType()
export class Business {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  website: string;

  @Field()
  isClaimed: boolean;

  @Field(() => [ID], { nullable: true })
  businessCategory?: string[];

  @Field(() => [ID], { nullable: true })
  amenity?: string[];

  @Field(() => [ID], { nullable: true })
  language?: string[];

  @Field(() => CommonRegion, { nullable: true })
  region?: CommonRegion;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [BusinessBooking], { nullable: true })
  businessBooking?: BusinessBooking[];

  @Field(() => [CommonBusinessDeal], { nullable: true })
  businessDeal?: CommonBusinessDeal[];

  @Field(() => [BusinessHour], { nullable: true })
  businessHour?: BusinessHour[];

  @Field(() => [BusinessLocation], { nullable: true })
  businessLocation?: BusinessLocation[];

  @Field(() => [CommonBusinessProduct], { nullable: true })
  businessProduct?: CommonBusinessProduct[];
}

@InputType()
export class CreateBusinessInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;

  @Field()
  isClaimed: boolean;

  @Field(() => [ID], { nullable: true })
  businessCategory?: string[];

  @Field(() => [ID], { nullable: true })
  amenity?: string[];

  @Field(() => ID)
  region: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessStatus;
}

@InputType()
export class UpdateBusinessInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  isClaimed?: boolean;

  @Field(() => [ID], { nullable: true })
  businessCategory?: string[];

  @Field(() => [ID], { nullable: true })
  amenity?: string[];

  @Field(() => ID, { nullable: true })
  region?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: BusinessStatus;
}
