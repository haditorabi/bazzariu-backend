import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBlocked {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => CommonUser)
  blocked: CommonUser;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserBlockedInput {
  @Field(() => ID)
  user: string;

  @Field(() => ID)
  blocked: string;
}

@InputType()
export class UpdateUserBlockedInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => ID, { nullable: true })
  blocked?: string;
}
