import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBlocked {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonUser)
  blocked?: CommonUser;

  @Field(() => ID)
  blockedId: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserBlockedInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  blockedId: string;
}

@InputType()
export class UpdateUserBlockedInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => ID, { nullable: true })
  blockedId?: string;
}
