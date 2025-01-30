import { Field, ObjectType, InputType, ID, Int, Float } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { BusinessDealStatus, DiscountType } from '@prisma/client';

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

  @Field()
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

  @Field()
  status: BusinessDealStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessDealInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  business: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field()
  discountType: DiscountType;

  @Field()
  value: number;

  @Field(() => Int, { nullable: true })
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  maxPerUser?: number;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessDealStatus;
}

@InputType()
export class UpdateBusinessDealInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field({ nullable: true })
  discountType?: DiscountType;

  @Field(() => Int || Float, { nullable: true })
  value?: number;

  @Field(() => Int, { nullable: true })
  maxRedemption?: number;

  @Field(() => Int, { nullable: true })
  maxPerUser?: number;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: BusinessDealStatus;
}
