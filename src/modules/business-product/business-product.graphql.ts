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

  @Field(() => CommonBusiness)
  business: CommonBusiness;

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
  businessDeal: CommonBusinessDeal;

  @Field(() => CommonBusinessProductPrice, { nullable: true })
  businessProductPrice: CommonBusinessProductPrice;
}

@InputType()
export class CreateBusinessProductInput {
  @Field(() => ID)
  business: string;

  @Field(() => [ID], { nullable: true })
  productCategroy?: string[];

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
  business?: string;

  @Field(() => [ID], { nullable: true })
  productCategroy?: string[];

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: BusinessProductStatus;
}
