import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserActionTargetType, UserActionType } from '@prisma/client';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserActionLog {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  action: UserActionType;

  @Field()
  actionDetails: object;

  @Field()
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  ipAddress: string;

  @Field()
  device: string;

  @Field()
  os: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserActionLogInput {
  @Field(() => ID)
  userId: string;

  @Field()
  action: UserActionType;

  @Field()
  actionDetails?: object;

  @Field()
  targetId: string;

  @Field()
  targetType: UserActionTargetType;

  @Field()
  ipAddress: string;

  @Field()
  device?: string;

  @Field()
  os?: string;
}

@InputType()
export class UpdateUserActionLogInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  action?: UserActionType;

  @Field({ nullable: true })
  actionDetails?: object;

  @Field({ nullable: true })
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
