import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { PaymentMethodStatus, PaymentMethodType } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { CommonPayment } from 'src/graphql/payment.type';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(PaymentMethodType, {
  name: 'PaymentMethodType',
});
registerEnumType(PaymentMethodStatus, {
  name: 'PaymentMethodStatus',
});
@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  paymentId: string;

  @Field({ nullable: true })
  details?: string;

  @Field(() => PaymentMethodType)
  type: PaymentMethodType;

  @Field(() => PaymentMethodStatus)
  status: PaymentMethodStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => [CommonPayment], { nullable: true })
  payment?: CommonPayment[];
}

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  details?: string;

  @Field(() => PaymentMethodType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(PaymentMethodType, { message: ValidationMessages.IS_ENUM })
  type: PaymentMethodType;

  @Field(() => PaymentMethodStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(PaymentMethodStatus, { message: ValidationMessages.IS_ENUM })
  status: PaymentMethodStatus;
}

@InputType()
export class UpdatePaymentMethodInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  details?: string;

  @Field(() => PaymentMethodType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(PaymentMethodType, { message: ValidationMessages.IS_ENUM })
  type?: PaymentMethodType;

  @Field(() => PaymentMethodStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(PaymentMethodStatus, { message: ValidationMessages.IS_ENUM })
  status?: PaymentMethodStatus;
}
