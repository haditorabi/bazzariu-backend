import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CurrencyStatus } from '@prisma/client';

@ObjectType()
export class Currency {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  status: CurrencyStatus;
}

@InputType()
export class CreateCurrencyInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  status: CurrencyStatus;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  status?: CurrencyStatus;
}
