import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';

@ObjectType()
export class CommonUser {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  status: UserStatus;

  @Field()
  createdAt: Date;
}
