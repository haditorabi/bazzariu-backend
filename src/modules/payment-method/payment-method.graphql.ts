import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { PaymentMethodStatus, PaymentMethodType } from '@prisma/client';
import { CommonPayment } from 'src/graphql/payment.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

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

  @Field()
  createdAt: Date;

  @Field(() => [CommonPayment], { nullable: true })
  payment?: CommonPayment[];
}

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => ID)
  user: string;

  @Field()
  details: string;

  @Field()
  type: PaymentMethodType;

  @Field()
  status: PaymentMethodStatus;
}

@InputType()
export class UpdatePaymentMethodInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  details?: string;

  @Field({ nullable: true })
  type?: PaymentMethodType;

  @Field({ nullable: true })
  status?: PaymentMethodStatus;
}
