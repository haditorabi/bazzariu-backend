import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserScore {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  score: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserScoreInput {
  @Field(() => ID)
  userId: string;

  @Field()
  score: string;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  score?: string;
}
