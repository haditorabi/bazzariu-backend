import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  follower: CommonUser;

  @Field(() => CommonUser)
  followee: CommonUser;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserFollowingInput {
  @Field(() => ID)
  follower: string;

  @Field(() => ID)
  followee: string;
}

@InputType()
export class UpdateUserFollowingInput {
  @Field(() => ID, { nullable: true })
  follower?: string;

  @Field(() => ID, { nullable: true })
  followee?: string;
}
