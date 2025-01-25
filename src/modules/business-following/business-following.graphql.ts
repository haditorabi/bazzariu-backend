import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class BusinessFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => CommonUser)
  user: CommonUser;
}

@InputType()
export class CreateBusinessFollowingInput {
  @Field(() => ID)
  business: string;

  @Field(() => ID)
  user: string;
}

@InputType()
export class UpdateBusinessFollowingInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => ID, { nullable: true })
  user?: string;
}
