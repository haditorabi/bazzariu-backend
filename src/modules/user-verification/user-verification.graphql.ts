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
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => UserVerificationType, { nullable: true })
  @IsNotEmpty()
  @IsEnum(UserVerificationType)
  type: UserVerificationType;

  @Field(() => UserVerificationStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(UserVerificationStatus)
  status: UserVerificationStatus;
}

@InputType()
export class UpdateUserVerificationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => UserVerificationType, { nullable: true })
  @IsOptional()
  @IsEnum(UserVerificationType)
  type?: UserVerificationType;

  @Field(() => UserVerificationStatus, { nullable: true })
  @IsOptional()
  @IsEnum(UserVerificationStatus)
  status?: UserVerificationStatus;
}
