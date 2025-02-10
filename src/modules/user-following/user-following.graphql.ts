import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  followerId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  followeeId: string;
}

@InputType()
export class UpdateUserFollowingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  followerId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  followeeId?: string;
}
