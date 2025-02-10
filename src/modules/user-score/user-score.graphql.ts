import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsInt, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserScore {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  score: number;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateUserScoreInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  @IsInt()
  score: number;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  score?: number;
}
