import {
  Field,
  ObjectType,
  InputType,
  ID,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
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
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(UserActionTargetType, {
  name: 'UserActionTargetType',
});
registerEnumType(UserActionType, {
  name: 'UserActionType',
});
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
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => UserActionType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserActionType, { message: ValidationMessages.IS_ENUM })
  action: UserActionType;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => UserActionTargetType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserActionTargetType, { message: ValidationMessages.IS_ENUM })
  targetType: UserActionTargetType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(1000, { message: ValidationMessages.MAX_LENGTH })
  actionDetails?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Min(1, { message: ValidationMessages.MIN })
  @Max(100, { message: ValidationMessages.MAX })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  points?: number;
}

@InputType()
export class UpdateUserActionInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => UserActionType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserActionType, { message: ValidationMessages.IS_ENUM })
  action?: UserActionType;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => UserActionTargetType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserActionTargetType, { message: ValidationMessages.IS_ENUM })
  targetType?: UserActionTargetType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @MaxLength(1000, { message: ValidationMessages.MAX_LENGTH })
  actionDetails?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  @Max(100, { message: ValidationMessages.MAX })
  @IsPositive({ message: ValidationMessages.IS_POSITIVE })
  points?: number;
}
