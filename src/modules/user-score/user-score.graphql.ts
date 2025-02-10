import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsInt, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsInt({ message: ValidationMessages.IS_INT })
  score: number;
}

@InputType()
export class UpdateUserScoreInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  score?: number;
}
