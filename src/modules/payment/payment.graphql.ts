import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
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
registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});
registerEnumType(PaymentTargetType, {
  name: 'PaymentTargetType',
});
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

  @Field(() => PaymentTargetType)
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

  @Field(() => PaymentStatus)
  status: PaymentStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreatePaymentInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  transactionId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => PaymentTargetType, { nullable: true })
  @IsNotEmpty()
  @IsEnum(PaymentTargetType)
  targetType: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  paymentMethodId: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  amount: number;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @Field(() => PaymentStatus, { nullable: true })
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

  @Field(() => PaymentTargetType, { nullable: true })
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

  @Field(() => PaymentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
