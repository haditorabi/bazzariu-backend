import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookmarkType } from '@prisma/client';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserBookmark {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
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

  @Field()
  targetId: string;

  @Field()
  targetType: UserBookmarkType;
}

@InputType()
export class UpdateUserBookmarkInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserBookmarkType;
}
