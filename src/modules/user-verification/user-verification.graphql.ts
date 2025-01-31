import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserVerificationStatus, UserVerificationType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserVerification {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  type: UserVerificationType;

  @Field()
  status: UserVerificationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserVerificationInput {
  @Field(() => ID)
  user: string;

  @Field()
  type: UserVerificationType;

  @Field()
  status: UserVerificationStatus;
}

@InputType()
export class UpdateUserVerificationInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  type?: UserVerificationType;

  @Field({ nullable: true })
  status?: UserVerificationStatus;
}
