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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => UserBookmarkType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserBookmarkType, { message: ValidationMessages.IS_ENUM })
  targetType: UserBookmarkType;
}

@InputType()
export class UpdateUserBookmarkInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => UserBookmarkType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserBookmarkType, { message: ValidationMessages.IS_ENUM })
  targetType?: UserBookmarkType;
}
