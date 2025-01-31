import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { Currency } from '../currency/currency.graphql';

@ObjectType()
export class BusinessProductPrice {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessProduct)
  businessProduct: CommonBusinessProduct;

  @Field(() => ID)
  businessProductId: string;

  @Field(() => Currency)
  currency: Currency;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessProductPriceInput {
  @Field(() => ID, { nullable: true })
  businessProduct: string;

  @Field(() => ID)
  currency: string;

  @Field()
  price: number;
}

@InputType()
export class UpdateBusinessProductPriceInput {
  @Field(() => ID, { nullable: true })
  businessProduct?: string;

  @Field(() => ID, { nullable: true })
  currency?: string;

  @Field({ nullable: true })
  price?: number;
}
