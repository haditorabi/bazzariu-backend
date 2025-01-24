import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Business } from 'src/graphql/business.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class BusinessFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => Business)
  business: Business;

  @Field(() => User)
  user: User;
}

@InputType()
export class CreateBusinessFollowingInput {
  @Field(() => ID)
  business: string;

  @Field(() => ID)
  user: string;
}

@InputType()
export class UpdateBusinessFollowingInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => ID, { nullable: true })
  user?: string;
}
