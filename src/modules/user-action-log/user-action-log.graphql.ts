import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsEnum,
  IsOptional,
  IsIP,
  IsString,
  MaxLength,
} from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserActionLog {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  action: UserActionType;

  @Field({ nullable: true })
  actionDetails?: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  ipAddress: string;

  @Field({ nullable: true })
  device?: string;

  @Field({ nullable: true })
  os?: string;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserActionLogInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => UserActionType)
  @IsNotEmpty()
  @IsEnum(UserActionType)
  action: UserActionType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => UserActionTargetType)
  @IsNotEmpty()
  @IsEnum(UserActionTargetType)
  targetType: UserActionTargetType;

  @Field()
  @IsNotEmpty()
  @IsIP('4')
  ipAddress: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  device?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  os?: string;
}

@InputType()
export class UpdateUserActionLogInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => UserActionType, { nullable: true })
  @IsOptional()
  @IsEnum(UserActionType)
  action?: UserActionType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

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
  @IsIP('4')
  ipAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  device?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  os?: string;
}
