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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => UserActionLogType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserActionLogType, { message: ValidationMessages.IS_ENUM })
  action: UserActionLogType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(1000, { message: ValidationMessages.MAX_LENGTH })
  actionDetails?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => UserActionLogTargetType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserActionLogTargetType, { message: ValidationMessages.IS_ENUM })
  targetType: UserActionLogTargetType;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsIP('4', { message: ValidationMessages.IS_IP })
  ipAddress: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(100, { message: ValidationMessages.MAX_LENGTH })
  device?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(100, { message: ValidationMessages.MAX_LENGTH })
  os?: string;
}

@InputType()
export class UpdateUserActionLogInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => UserActionLogType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserActionLogType, { message: ValidationMessages.IS_ENUM })
  action?: UserActionLogType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(1000, { message: ValidationMessages.MAX_LENGTH })
  actionDetails?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => UserActionLogTargetType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserActionLogTargetType, { message: ValidationMessages.IS_ENUM })
  targetType?: UserActionLogTargetType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsIP('4', { message: ValidationMessages.IS_IP })
  ipAddress?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(100, { message: ValidationMessages.MAX_LENGTH })
  device?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(100, { message: ValidationMessages.MAX_LENGTH })
  os?: string;
}
