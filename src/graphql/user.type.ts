import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';

@ObjectType()
export class CommonUser {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  status?: UserStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}
