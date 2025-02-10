import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { TransactionStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsDecimal,
  IsPositive,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonPayment } from 'src/graphql/payment.type';
import { CommonUser } from 'src/graphql/user.type';
registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
});
@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => CommonPayment, { nullable: true })
  payment?: CommonPayment;

  @Field(() => ID)
  paymentId: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field()
  currencyId: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  amount: number;

  @Field()
  description?: string;

  @Field(() => TransactionStatus)
  status: TransactionStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateTransactionInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  paymentId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  amount: number;

  @Field()
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TransactionStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  paymentId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  currencyId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  @IsPositive()
  amount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TransactionStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
