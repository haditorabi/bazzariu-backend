import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  follower: User;

  @Field(() => User)
  followee: User;

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
