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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessDealId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  userId: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  redeemedAt?: Date;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  expiresAt: Date;

  @Field(() => DealsRedemptionStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(DealsRedemptionStatus, { message: ValidationMessages.IS_ENUM })
  status: DealsRedemptionStatus;
}

@InputType()
export class UpdateDealsRedemptionInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessDealId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  userId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  redeemedAt?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  expiresAt?: Date;

  @Field(() => DealsRedemptionStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(DealsRedemptionStatus, { message: ValidationMessages.IS_ENUM })
  status?: DealsRedemptionStatus;
}
