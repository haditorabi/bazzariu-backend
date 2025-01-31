import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { PaymentStatus, PaymentTargetType } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonPaymentMethod } from 'src/graphql/payment-method.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  transactionId?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: PaymentTargetType;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => CommonPaymentMethod)
  paymentMethod: CommonPaymentMethod;

  @Field(() => ID)
  paymentMethodId: string;

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
  userId: string;

  @Field(() => ID, { nullable: true })
  businessId?: string;

  @Field(() => ID)
  paymentMethodId?: string;

  @Field()
  amount: number;

  @Field(() => ID)
  currencyId: string;

  @Field()
  status: PaymentStatus;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => ID, { nullable: true })
  transactionId?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: PaymentTargetType;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => ID, { nullable: true })
  businessId?: string;

  @Field(() => ID, { nullable: true })
  paymentMethodId?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  currencyId?: string;

  @Field({ nullable: true })
  status?: PaymentStatus;
}
