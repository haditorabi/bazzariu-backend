import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonProductCategory } from 'src/graphql/product-category.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProductPrice } from 'src/graphql/business-product-price.type';

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

  @Field()
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
  businessId: string;

  @Field(() => [ID], { nullable: true })
  productCategroyId?: string[];

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessProductStatus;
}

@InputType()
export class UpdateBusinessProductInput {
  @Field(() => ID, { nullable: true })
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  productCategroyId?: string[];

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: BusinessProductStatus;
}
