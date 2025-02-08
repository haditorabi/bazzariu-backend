import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { DealsRedemptionStatus } from '@prisma/client';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class DealsRedemption {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessDeal, { nullable: true })
  businessDeal?: CommonBusinessDeal;

  @Field(() => ID)
  businessDealId: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  redeemedAt?: Date;

  @Field()
  expiresAt: Date;

  @Field()
  status: DealsRedemptionStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateDealsRedemptionInput {
  @Field(() => ID)
  businessDealId: string;

  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  redeemedAt?: Date;

  @Field()
  expiresAt: Date;

  @Field()
  status: DealsRedemptionStatus;
}

@InputType()
export class UpdateDealsRedemptionInput {
  @Field(() => ID, { nullable: true })
  businessDealId?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  redeemedAt?: Date;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  status?: DealsRedemptionStatus;
}
