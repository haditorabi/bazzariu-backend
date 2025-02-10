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
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(10, 280)
  description?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => DiscountType)
  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  value: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxPerUser?: number;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessDealStatus)
  @IsNotEmpty()
  @IsEnum(BusinessDealStatus)
  status: BusinessDealStatus;
}

@InputType()
export class UpdateBusinessDealInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(10, 280)
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => DiscountType, { nullable: true })
  @IsOptional()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @Field(() => Int || Float, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  value?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxPerUser?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessDealStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessDealStatus)
  status?: BusinessDealStatus;
}
