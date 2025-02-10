import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  lastName?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEmail({}, { message: ValidationMessages.IS_EMAIL })
  email: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEmail({}, { message: ValidationMessages.IS_EMAIL })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  email?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  lastName?: string;
}
