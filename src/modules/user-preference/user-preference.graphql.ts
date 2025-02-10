import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsString, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserPreference {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  key: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserPreferenceInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  key: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  value: string;
}

@InputType()
export class UpdateUserPreferenceInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  key?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  value?: string;
}
