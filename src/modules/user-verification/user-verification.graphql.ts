import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserVerificationStatus, UserVerificationType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserVerification {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  type: UserVerificationType;

  @Field()
  status: UserVerificationStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserVerificationInput {
  @Field(() => ID)
  userId: string;

  @Field()
  type: UserVerificationType;

  @Field()
  status: UserVerificationStatus;
}

@InputType()
export class UpdateUserVerificationInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  type?: UserVerificationType;

  @Field({ nullable: true })
  status?: UserVerificationStatus;
}
