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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  transactionId: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => PaymentTargetType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(PaymentTargetType, { message: ValidationMessages.IS_ENUM })
  targetType: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  paymentMethodId: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  amount: number;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  currencyId: string;

  @Field(() => PaymentStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(PaymentStatus, { message: ValidationMessages.IS_ENUM })
  status: PaymentStatus;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  transactionId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => PaymentTargetType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(PaymentTargetType, { message: ValidationMessages.IS_ENUM })
  targetType?: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  paymentMethodId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  amount?: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  currencyId?: string;

  @Field(() => PaymentStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(PaymentStatus, { message: ValidationMessages.IS_ENUM })
  status?: PaymentStatus;
}
