import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Business } from 'src/graphql/business.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class BusinessFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => Business)
  business: Business;

  @Field(() => User)
  user: User;
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
