import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { DealsRedemptionStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonUser } from 'src/graphql/user.type';
registerEnumType(DealsRedemptionStatus, {
  name: 'DealsRedemptionStatus',
});
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

  @Field(() => DealsRedemptionStatus)
  status: DealsRedemptionStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateDealsRedemptionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessDealId: string;

  @Field(() => ID)
  @IsNotEmpty()
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  redeemedAt?: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  expiresAt: Date;

  @Field(() => DealsRedemptionStatus)
  @IsNotEmpty()
  @IsEnum(DealsRedemptionStatus)
  status: DealsRedemptionStatus;
}

@InputType()
export class UpdateDealsRedemptionInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessDealId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  redeemedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @Field(() => DealsRedemptionStatus, { nullable: true })
  @IsOptional()
  @IsEnum(DealsRedemptionStatus)
  status?: DealsRedemptionStatus;
}
