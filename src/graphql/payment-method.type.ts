import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { PaymentMethodStatus, PaymentMethodType } from '@prisma/client';
registerEnumType(PaymentMethodType, {
  name: 'PaymentMethodType',
});
registerEnumType(PaymentMethodStatus, {
  name: 'PaymentMethodStatus',
});
@ObjectType()
export class CommonPaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  details?: string;

  @Field(() => PaymentMethodType)
  type: PaymentMethodType;

  @Field(() => PaymentMethodStatus)
  status: PaymentMethodStatus;

  @Field()
  createdAt: Date;
}
