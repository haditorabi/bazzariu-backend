import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookmarkType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBookmark {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserBookmarkType;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserBookmarkInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserBookmarkType;
}

@InputType()
export class UpdateUserBookmarkInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserBookmarkType;
}
