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

  @Field(() => ID, { nullable: true })
  businessDealId?: string;
}

@InputType()
export class CreateBusinessProductInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  productCategroyId?: string[];

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 250)
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessProductStatus)
  @IsNotEmpty()
  @IsEnum(BusinessProductStatus)
  status: BusinessProductStatus;
}

@InputType()
export class UpdateBusinessProductInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  productCategroyId?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 250)
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessProductStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessProductStatus)
  status?: BusinessProductStatus;
}
