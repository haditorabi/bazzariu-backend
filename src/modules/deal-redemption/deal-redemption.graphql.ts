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
  @Field()
  name: string;

  @Field()
  email: string;
}

@InputType()
export class UpdateDealsRedemptionInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
