import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { UserVerificationStatus, UserVerificationType } from '@prisma/client';
import { IsNotEmpty, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(UserVerificationStatus, {
  name: 'UserVerificationStatus',
});
registerEnumType(UserVerificationType, {
  name: 'UserVerificationType',
});
@ObjectType()
export class UserVerification {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => UserVerificationType)
  type: UserVerificationType;

  @Field(() => UserVerificationStatus)
  status: UserVerificationStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserVerificationInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => UserVerificationType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserVerificationType, { message: ValidationMessages.IS_ENUM })
  type: UserVerificationType;

  @Field(() => UserVerificationStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserVerificationStatus, { message: ValidationMessages.IS_ENUM })
  status: UserVerificationStatus;
}

@InputType()
export class UpdateUserVerificationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => UserVerificationType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserVerificationType, { message: ValidationMessages.IS_ENUM })
  type?: UserVerificationType;

  @Field(() => UserVerificationStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserVerificationStatus, { message: ValidationMessages.IS_ENUM })
  status?: UserVerificationStatus;
}
