import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserPreference {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field()
  key: string;

  @Field()
  value: string;

  @Field()
  updatedAt: Date;
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
