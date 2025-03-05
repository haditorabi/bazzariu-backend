import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonProductCategory } from 'src/graphql/product-category.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProductPrice } from 'src/graphql/business-product-price.type';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsArray,
  IsString,
  Length,
  IsEnum,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessProductStatus, {
  name: 'BusinessProductStatus',
});
@ObjectType()
export class BusinessProduct {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => CommonProductCategory, { nullable: true })
  productCategroy?: CommonProductCategory;

  @Field(() => ID, { nullable: true })
  productCategroyId?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => BusinessProductStatus)
  status: BusinessProductStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => CommonBusinessDeal, { nullable: true })
  businessDeal?: CommonBusinessDeal;

  @Field(() => CommonBusinessProductPrice, { nullable: true })
  businessProductPrice?: CommonBusinessProductPrice;

  @Field(() => [ID], { nullable: true })
  businessDealId?: string[];
}

@InputType()
export class CreateBusinessProductInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  productCategroyId?: string[];

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 250, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessProductStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessProductStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessProductStatus;
}

@InputType()
export class UpdateBusinessProductInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  productCategroyId?: string[];

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 250, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessProductStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessProductStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessProductStatus;
}
