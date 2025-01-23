import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class BusinessFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => ID)
  userId: string;
}

@InputType()
export class CreateBusinessFollowingInput {
  @Field(() => ID)
  businessId: string;

  @Field(() => ID)
  userId: string;
}

@InputType()
export class UpdateBusinessFollowingInput {
  @Field(() => ID, { nullable: true })
  businessId?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;
}
