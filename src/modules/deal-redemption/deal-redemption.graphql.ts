import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { DealsRedemptionStatus } from '@prisma/client';
import { BusinessDeal } from 'src/graphql/business-deal.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class DealsRedemption {
  @Field(() => ID)
  id: string;

  @Field(() => BusinessDeal)
  businessDeal: BusinessDeal;

  @Field(() => User)
  user: User;

  @Field()
  redeemedAt: Date;

  @Field()
  expiresAt: Date;

  @Field()
  status: DealsRedemptionStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateDealsRedemptionInput {
  @Field(() => ID)
  businessDealId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  redeemedAt: Date;

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
