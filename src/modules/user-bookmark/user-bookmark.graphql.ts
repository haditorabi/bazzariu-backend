import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { UserBookmarkType } from '@prisma/client';
import { IsNotEmpty, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
registerEnumType(UserBookmarkType, {
  name: 'UserBookmarkType',
});
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

  @Field(() => UserBookmarkType)
  targetType: UserBookmarkType;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserBookmarkInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => UserBookmarkType)
  @IsNotEmpty()
  @IsEnum(UserBookmarkType)
  targetType: UserBookmarkType;
}

@InputType()
export class UpdateUserBookmarkInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field(() => UserBookmarkType, { nullable: true })
  @IsOptional()
  @IsEnum(UserBookmarkType)
  targetType?: UserBookmarkType;
}
