import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DiscountType, UserStatus } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  firstName: string;

  @Field()
  lastName: DiscountType;

  @Field()
  status: UserStatus;

  @Field()
  createdAt: Date;
}
