import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PaymentStatus, PaymentTargetType } from '@prisma/client';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field()
  transactionId: string;

  @Field()
  description?: string;

  @Field()
  targetId: string;

  @Field()
  targetType: PaymentTargetType;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => ID)
  paymentMethodId: string;

  @Field()
  amount: number;

  @Field()
  currencyId: string;

  @Field()
  status: PaymentStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
