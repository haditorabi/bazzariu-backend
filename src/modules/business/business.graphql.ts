import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';
import { CommonBusinessHour } from 'src/graphql/business-hour.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { CommonBusinessLocation } from 'src/graphql/business-location.type';
import { CommonRegion } from 'src/graphql/region.type';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsUrl,
  IsBoolean,
  IsArray,
  IsMongoId,
  IsEnum,
} from 'class-validator';
registerEnumType(BusinessStatus, {
  name: 'BusinessStatus',
});

@ObjectType()
export class Business {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;

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

  @Field(() => CommonRegion, { nullable: true })
  region?: CommonRegion;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => BusinessStatus)
  status: BusinessStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

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
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(20, 250)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  website?: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  isClaimed: boolean;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  amenityId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  languageId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessStatus)
  @IsNotEmpty()
  @IsEnum(BusinessStatus)
  status: BusinessStatus;
}

@InputType()
export class UpdateBusinessInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(20, 250)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isClaimed?: boolean;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  languageId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  amenityId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessStatus)
  status?: BusinessStatus;
}
