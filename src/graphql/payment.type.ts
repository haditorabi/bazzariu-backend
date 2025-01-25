import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PaymentStatus, PaymentTargetType } from '@prisma/client';

@ObjectType()
export class CommonPayment {
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

  @Field(() => ID)
  userId: string;

  @Field(() => ID, { nullable: true })
  businessId?: string;

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
