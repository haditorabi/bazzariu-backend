import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserActionLog {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  action: UserActionType;

  @Field({ nullable: true })
  actionDetails?: object;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  ipAddress: string;

  @Field({ nullable: true })
  device?: string;

  @Field({ nullable: true })
  os?: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserActionLogInput {
  @Field(() => ID)
  user: string;

  @Field()
  action: UserActionType;

  @Field({ nullable: true })
  actionDetails?: object;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  ipAddress: string;

  @Field({ nullable: true })
  device?: string;

  @Field({ nullable: true })
  os?: string;
}

@InputType()
export class UpdateUserActionLogInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  action?: UserActionType;

  @Field({ nullable: true })
  actionDetails?: object;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserActionTargetType;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  device?: string;

  @Field({ nullable: true })
  os?: string;
}
