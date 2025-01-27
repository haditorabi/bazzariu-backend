import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserAction {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field()
  action: UserActionType;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  accountDetails: object;

  @Field()
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
  accountDetails: object;

  @Field()
  points?: number;
}

@InputType()
export class UpdateUserActionInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  action?: UserActionType;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserActionTargetType;

  @Field({ nullable: true })
  accountDetails?: object;

  @Field({ nullable: true })
  points?: number;
}
