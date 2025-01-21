import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessDealStatus, DiscountType } from '@prisma/client';

@ObjectType()
export class BusinessDeal {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

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

  @Field()
  mediaId: string[];

  @Field()
  status: BusinessDealStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
