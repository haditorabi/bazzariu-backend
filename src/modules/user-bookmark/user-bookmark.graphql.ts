import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookmarkType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBookmark {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserBookmarkType;

  @Field()
  createdAt: Date;
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
