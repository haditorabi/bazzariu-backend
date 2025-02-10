import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { PaymentStatus, PaymentTargetType } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
  IsEnum,
  IsDecimal,
  IsPositive,
} from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonPaymentMethod } from 'src/graphql/payment-method.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  transactionId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: PaymentTargetType;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => CommonPaymentMethod, { nullable: true })
  paymentMethod?: CommonPaymentMethod;

  @Field(() => ID)
  paymentMethodId: string;

  @Field()
  amount: number;

  @Field(() => ID)
  currencyId: string;

  @Field()
  status: PaymentStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreatePaymentInput {
  @Field(() => ID)
  @IsNotEmpty()
  transactionId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PaymentTargetType)
  targetType: PaymentTargetType;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  paymentMethodId: string;

  @Field()
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  amount: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  transactionId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PaymentTargetType)
  targetType?: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  paymentMethodId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  @IsPositive()
  amount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  currencyId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
