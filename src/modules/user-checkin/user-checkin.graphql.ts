import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserCheckin {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => CommonBusiness)
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserCheckinInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  businessId: string;
}

@InputType()
export class UpdateUserCheckinInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => ID, { nullable: true })
  businessId?: string;
}
