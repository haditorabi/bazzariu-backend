import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsEmail,
} from 'class-validator';

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
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  lastName?: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @Length(3, 100)
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 100)
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;
}
