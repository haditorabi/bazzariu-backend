import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsDecimal, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserWallet {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field()
  balance: number;

  @Field(() => ID)
  currencyId: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserWalletInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDecimal()
  balance: number;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;
}

@InputType()
export class UpdateUserWalletInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  balance?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  currencyId?: string;
}
