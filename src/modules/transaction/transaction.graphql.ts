import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma/client';
import { Business } from 'src/graphql/business.type';
import { Payment } from 'src/graphql/payment.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => Payment)
  payment: Payment;

  @Field(() => Business)
  business: Business;

  @Field()
  currencyId: string;

  @Field(() => User)
  user: User;

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

  @Field()
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

  @Field({ nullable: true })
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
