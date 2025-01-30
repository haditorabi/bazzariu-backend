import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { DealsRedemptionStatus } from '@prisma/client';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class DealsRedemption {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessDeal)
  businessDeal: CommonBusinessDeal;

  @Field(() => CommonUser)
  user: CommonUser;

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
  businessDeal: string;

  @Field(() => ID)
  user: string;

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
  businessDeal?: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  redeemedAt?: Date;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  status?: DealsRedemptionStatus;
}
