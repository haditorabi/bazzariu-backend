import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { PaymentStatus, PaymentTargetType } from '@prisma/client';
import { Business } from 'src/graphql/business.type';
import { PaymentMethod } from 'src/graphql/payment-method.type';
import { User } from 'src/graphql/user.type';

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

  @Field(() => User)
  user: User;

  @Field(() => Business)
  business: Business;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field()
  amount: number;

  @Field(() => ID)
  currencyId: string;

  @Field()
  status: PaymentStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreatePaymentInput {
  @Field(() => ID)
  transactionId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: PaymentTargetType;

  @Field(() => ID)
  user: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => ID)
  paymentMethod?: string;

  @Field()
  amount: number;

  @Field(() => ID)
  currencyId: string;

  @Field()
  status: PaymentStatus;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  transactionId?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => ID, { nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  currencyId?: string;

  @Field({ nullable: true })
  status?: PaymentStatus;
}
