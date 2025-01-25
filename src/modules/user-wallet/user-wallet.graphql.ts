import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserWallet {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field()
  balance: number;

  @Field(() => ID)
  currencyId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserWalletInput {
  @Field(() => ID)
  userId: string;

  @Field()
  balance: number;

  @Field(() => ID)
  currencyId: string;
}

@InputType()
export class UpdateUserWalletInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  balance?: number;

  @Field(() => ID, { nullable: true })
  currencyId?: string;
}
