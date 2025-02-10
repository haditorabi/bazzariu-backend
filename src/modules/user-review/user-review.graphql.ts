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
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId: string;

  @Field(() => UserReviewType)
  @IsNotEmpty()
  @IsEnum(UserReviewType)
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  mediaId?: string[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3000)
  content?: string;

  @Field(() => UserReviewStatus)
  @IsNotEmpty()
  @IsEnum(UserReviewStatus)
  status: UserReviewStatus;
}

@InputType()
export class UpdateUserReviewInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field(() => UserReviewType, { nullable: true })
  @IsOptional()
  @IsEnum(UserReviewType)
  targetType?: UserReviewType;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3000)
  content?: string;

  @Field(() => UserReviewStatus, { nullable: true })
  @IsOptional()
  @IsEnum(UserReviewStatus)
  status?: UserReviewStatus;
}
