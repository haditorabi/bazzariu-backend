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
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  details?: string;

  @Field(() => PaymentMethodType, { nullable: true })
  @IsNotEmpty()
  @IsEnum(PaymentMethodType)
  type: PaymentMethodType;

  @Field(() => PaymentMethodStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(PaymentMethodStatus)
  status: PaymentMethodStatus;
}

@InputType()
export class UpdatePaymentMethodInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  details?: string;

  @Field(() => PaymentMethodType, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentMethodType)
  type?: PaymentMethodType;

  @Field(() => PaymentMethodStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentMethodStatus)
  status?: PaymentMethodStatus;
}
