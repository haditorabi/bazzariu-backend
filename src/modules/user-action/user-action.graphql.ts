import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  Min,
  IsPositive,
  IsInt,
  MaxLength,
} from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserAction {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => UserActionType)
  action: UserActionType;

  @Field(() => ID)
  targetId: string;

  @Field(() => UserActionTargetType)
  targetType: UserActionTargetType;

  @Field({ nullable: true })
  actionDetails?: string;

  @Field(() => Int)
  points: number;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserActionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => UserActionType)
  @IsNotEmpty()
  @IsEnum(UserActionType)
  action: UserActionType;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => UserActionTargetType)
  @IsNotEmpty()
  @IsEnum(UserActionTargetType)
  targetType: UserActionTargetType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

  @Field()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @IsPositive()
  points?: number;
}

@InputType()
export class UpdateUserActionInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => UserActionType, { nullable: true })
  @IsOptional()
  @IsEnum(UserActionType)
  action?: UserActionType;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field(() => UserActionTargetType, { nullable: true })
  @IsOptional()
  @IsEnum(UserActionTargetType)
  targetType?: UserActionTargetType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @IsPositive()
  points?: number;
}
