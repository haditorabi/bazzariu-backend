import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  follower?: CommonUser;

  @Field(() => ID)
  followerId: string;

  @Field(() => CommonUser, { nullable: true })
  followee?: CommonUser;

  @Field(() => ID)
  followeeId: string;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserFollowingInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  followerId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  followeeId: string;
}

@InputType()
export class UpdateUserFollowingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  followerId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  followeeId?: string;
}
