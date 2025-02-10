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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(20, 250, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsUrl({}, { message: ValidationMessages.IS_URL })
  website?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsBoolean({ message: ValidationMessages.IS_BOOLEAN })
  isClaimed: boolean;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  amenityId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  languageId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessStatus;
}

@InputType()
export class UpdateBusinessInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(20, 250, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsUrl({}, { message: ValidationMessages.IS_URL })
  website?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsBoolean({ message: ValidationMessages.IS_BOOLEAN })
  isClaimed?: boolean;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  languageId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  amenityId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessStatus;
}
