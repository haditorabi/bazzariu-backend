import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserScore {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  score: number;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserScoreInput {
  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  score: number;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => Int, { nullable: true })
  score?: number;
}
