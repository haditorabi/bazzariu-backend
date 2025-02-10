import {
  Field,
  ObjectType,
  InputType,
  ID,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { BusinessDealStatus, DiscountType } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsMongoId,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  IsDate,
  IsPositive,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessDealStatus, {
  name: 'BusinessDealStatus',
});
registerEnumType(DiscountType, {
  name: 'DiscountType',
});
@ObjectType()
export class BusinessDeal {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => [CommonBusinessProduct], { nullable: true })
  businessProduct?: CommonBusinessProduct[];

  @Field(() => DiscountType)
  discountType: DiscountType;

  @Field()
  value: number;

  @Field(() => Int)
  maxRedemption: number;

  @Field(() => Int)
  maxPerUser: number;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => BusinessDealStatus)
  status: BusinessDealStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessDealInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 80, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(10, 280, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => DiscountType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(DiscountType, { message: ValidationMessages.IS_ENUM })
  discountType: DiscountType;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsInt({ message: ValidationMessages.IS_INT })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  value: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxPerUser?: number;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startDate: Date;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessDealStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessDealStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessDealStatus;
}

@InputType()
export class UpdateBusinessDealInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 80, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(10, 280, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => DiscountType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(DiscountType, { message: ValidationMessages.IS_ENUM })
  discountType?: DiscountType;

  @Field(() => Int || Float, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  value?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxPerUser?: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessDealStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessDealStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessDealStatus;
}
