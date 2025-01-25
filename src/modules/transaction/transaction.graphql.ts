import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonPayment } from 'src/graphql/payment.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => CommonPayment)
  payment: CommonPayment;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field()
  currencyId: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field()
  amount: number;

  @Field()
  description?: string;

  @Field()
  status: TransactionStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateTransactionInput {
  @Field(() => ID)
  paymentId: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => ID)
  currencyId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  amount: number;

  @Field()
  description?: string;

  @Field()
  status: TransactionStatus;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => ID, { nullable: true })
  paymentId?: string;

  @Field(() => ID, { nullable: true })
  businessId?: string;

  @Field(() => ID, { nullable: true })
  currencyId?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: TransactionStatus;
}
