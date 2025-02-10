import {
  Field,
  ObjectType,
  InputType,
  ID,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { UserReviewStatus, UserReviewType } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsString,
  Length,
  IsArray,
} from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(UserReviewType, {
  name: 'UserReviewType',
});
registerEnumType(UserReviewStatus, {
  name: 'UserReviewStatus',
});
@ObjectType()
export class UserReview {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  targetId: string;

  @Field(() => UserReviewType)
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  rating: number;

  @Field({ nullable: true })
  content?: string;

  @Field()
  status: UserReviewStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserReviewInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => UserReviewType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserReviewType, { message: ValidationMessages.IS_ENUM })
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  mediaId?: string[];

  @Field(() => Int, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  @Max(5, { message: ValidationMessages.MAX })
  rating: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3000, { message: ValidationMessages.LENGTH })
  content?: string;

  @Field(() => UserReviewStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserReviewStatus, { message: ValidationMessages.IS_ENUM })
  status: UserReviewStatus;
}

@InputType()
export class UpdateUserReviewInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => UserReviewType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserReviewType, { message: ValidationMessages.IS_ENUM })
  targetType?: UserReviewType;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  @Max(5, { message: ValidationMessages.MAX })
  rating?: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3000, { message: ValidationMessages.LENGTH })
  content?: string;

  @Field(() => UserReviewStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserReviewStatus, { message: ValidationMessages.IS_ENUM })
  status?: UserReviewStatus;
}
