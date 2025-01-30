import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserAction {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  action: UserActionType;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  accountDetails: string;

  @Field(() => Int)
  points: number;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserActionInput {
  @Field(() => ID)
  user: string;

  @Field()
  action: UserActionType;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  accountDetails: string;

  @Field(() => Int)
  points?: number;
}

@InputType()
export class UpdateUserActionInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  action?: UserActionType;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserActionTargetType;

  @Field({ nullable: true })
  accountDetails?: string;

  @Field(() => Int, { nullable: true })
  points?: number;
}
