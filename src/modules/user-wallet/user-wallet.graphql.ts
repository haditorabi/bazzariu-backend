import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserWallet {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  balance: number;

  @Field()
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

  @Field()
  currencyId: string;
}

@InputType()
export class UpdateUserWalletInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  balance?: number;

  @Field({ nullable: true })
  currencyId?: string;
}
