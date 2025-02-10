import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBlocked {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonUser, { nullable: true })
  blocked?: CommonUser;

  @Field(() => ID)
  blockedId: string;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserBlockedInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  blockedId: string;
}

@InputType()
export class UpdateUserBlockedInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  blockedId?: string;
}
