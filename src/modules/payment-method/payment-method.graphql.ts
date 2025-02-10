import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
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

  @Field()
  type: PaymentMethodType;

  @Field()
  status: PaymentMethodStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => [CommonPayment], { nullable: true })
  payment?: CommonPayment[];
}

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  details?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PaymentMethodType)
  type: PaymentMethodType;

  @Field()
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PaymentMethodType)
  type?: PaymentMethodType;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PaymentMethodStatus)
  status?: PaymentMethodStatus;
}
