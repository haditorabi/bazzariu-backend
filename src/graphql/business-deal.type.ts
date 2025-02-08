import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { BusinessDealStatus, DiscountType } from '@prisma/client';

@ObjectType()
export class CommonBusinessDeal {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => [ID], { nullable: true })
  businessProductId?: string[];

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
