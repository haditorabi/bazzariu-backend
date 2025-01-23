import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';
import { Business } from 'src/graphql/business.type';
import { ProductCategory } from 'src/graphql/product-category.type';
import { BusinessDeal } from 'src/graphql/business-deal.type';
import { BusinessProductPrice } from './business-product-price.type';

@ObjectType()
export class BusinessProduct {
  @Field(() => ID)
  id: string;

  @Field(() => Business)
  business: Business;

  @Field(() => ProductCategory)
  productCategroy?: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field(() => [ID])
  mediaId?: string[];

  @Field()
  status: BusinessProductStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => BusinessDeal, { nullable: true })
  businessDeal: BusinessDeal;

  @Field(() => BusinessProductPrice, { nullable: true })
  businessProductPrice: BusinessProductPrice;
}

@InputType()
export class CreateBusinessProductInput {
  @Field(() => ID)
  business: string;

  @Field(() => [ID])
  productCategroy?: string[];

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field(() => [ID])
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
