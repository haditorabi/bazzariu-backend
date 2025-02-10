import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { UserActionLogTargetType, UserActionLogType } from '@prisma/client';
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
registerEnumType(UserActionLogTargetType, {
  name: 'UserActionLogTargetType',
});
registerEnumType(UserActionLogType, {
  name: 'UserActionLogType',
});
@ObjectType()
export class UserActionLog {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => UserActionLogType)
  action: UserActionLogType;

  @Field({ nullable: true })
  actionDetails?: string;

  @Field(() => ID)
  targetId: string;

  @Field(() => UserActionLogTargetType)
  targetType: UserActionLogTargetType;

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
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => UserActionLogType, { nullable: true })
  @IsNotEmpty()
  @IsEnum(UserActionLogType)
  action: UserActionLogType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => UserActionLogTargetType, { nullable: true })
  @IsNotEmpty()
  @IsEnum(UserActionLogTargetType)
  targetType: UserActionLogTargetType;

  @Field({ nullable: true })
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

  @Field(() => UserActionLogType, { nullable: true })
  @IsOptional()
  @IsEnum(UserActionLogType)
  action?: UserActionLogType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  actionDetails?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field(() => UserActionLogTargetType, { nullable: true })
  @IsOptional()
  @IsEnum(UserActionLogTargetType)
  targetType?: UserActionLogTargetType;

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
