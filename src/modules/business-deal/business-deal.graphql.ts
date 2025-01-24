import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Business } from '../../graphql/business.type';
import { BusinessProduct } from '../../graphql/business-product.type';
import { BusinessDealStatus, DiscountType } from '@prisma/client';

@ObjectType()
export class BusinessDeal {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field(() => Business)
  business: Business;

  @Field(() => [BusinessProduct], { nullable: true })
  businessProduct?: BusinessProduct[];

  @Field()
  discountType: DiscountType;

  @Field()
  value: number;

  @Field()
  maxRedemption: number;

  @Field()
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

  @Field({ nullable: true })
  maxRedemption?: number;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  value?: number;

  @Field({ nullable: true })
  maxRedemption?: number;

  @Field({ nullable: true })
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
