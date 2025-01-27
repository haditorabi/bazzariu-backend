import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserScore {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field()
  score: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserScoreInput {
  @Field(() => ID)
  user: string;

  @Field()
  score: number;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  score?: number;
}
