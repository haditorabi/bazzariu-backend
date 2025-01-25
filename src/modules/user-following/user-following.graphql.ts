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
  followerId: string;

  @Field(() => ID)
  followeeId: string;
}

@InputType()
export class UpdateUserFollowingInput {
  @Field(() => ID, { nullable: true })
  followerId?: string;

  @Field(() => ID, { nullable: true })
  followeeId?: string;
}
