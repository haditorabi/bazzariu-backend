import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserCheckin {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserCheckinInput {
  @Field(() => ID)
  user: string;

  @Field(() => ID)
  business: string;
}

@InputType()
export class UpdateUserCheckinInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => ID, { nullable: true })
  business?: string;
}
