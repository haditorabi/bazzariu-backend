import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserScore {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  score: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserScoreInput {
  @Field(() => ID)
  user: string;

  @Field(() => Int)
  score: number;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => Int, { nullable: true })
  score?: number;
}
