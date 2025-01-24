import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PaymentMethodStatus, PaymentMethodType } from '@prisma/client';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  details?: string;

  @Field()
  type: PaymentMethodType;

  @Field()
  status: PaymentMethodStatus;

  @Field()
  createdAt: Date;
}
