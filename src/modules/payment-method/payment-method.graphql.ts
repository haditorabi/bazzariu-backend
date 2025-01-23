import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { PaymentMethodStatus, PaymentMethodType } from '@prisma/client';
import { Payment } from 'src/graphql/payment.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  details: string;

  @Field()
  type: PaymentMethodType;

  @Field()
  status: PaymentMethodStatus;

  @Field()
  createdAt: Date;

  @Field(() => [Payment])
  payment: Payment[];
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
