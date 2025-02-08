import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserPreference {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  key: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserPreferenceInput {
  @Field(() => ID)
  userId: string;

  @Field()
  key: string;

  @Field()
  value: string;
}

@InputType()
export class UpdateUserPreferenceInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  key?: string;

  @Field({ nullable: true })
  value?: string;
}
