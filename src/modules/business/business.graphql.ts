import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';
import { CommonBusinessHour } from 'src/graphql/business-hour.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { CommonBusinessLocation } from 'src/graphql/business-location.type';

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
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  amenityId?: string[];

  @Field(() => [ID], { nullable: true })
  languageId?: string[];

  @Field(() => ID, { nullable: true })
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [CommonBusinessBooking], { nullable: true })
  businessBooking?: CommonBusinessBooking[];

  @Field(() => [CommonBusinessDeal], { nullable: true })
  businessDeal?: CommonBusinessDeal[];

  @Field(() => [CommonBusinessHour], { nullable: true })
  businessHour?: CommonBusinessHour[];

  @Field(() => [CommonBusinessLocation], { nullable: true })
  businessLocation?: CommonBusinessLocation[];

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
