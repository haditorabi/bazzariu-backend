import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BusinessProductPrice {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  currencyId: string;

  @Field()
  price: number;
}
