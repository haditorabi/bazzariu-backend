import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Business } from 'src/graphql/business.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserCheckin {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => Business)
  business: Business;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserCheckinInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  businessId: Business;
}

@InputType()
export class UpdateUserCheckinInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => ID, { nullable: true })
  businessId?: Business;
}
