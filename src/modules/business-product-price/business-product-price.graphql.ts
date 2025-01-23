import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessProduct } from 'src/graphql/business-product.type';

@ObjectType()
export class BusinessProductPrice {
  @Field(() => ID)
  id: string;

  @Field(() => BusinessProduct)
  businessProduct: BusinessProduct;

  @Field(() => ID)
  currencyId: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessProductInput {
  @Field(() => ID, { nullable: true })
  businessProductID: string;

  @Field(() => ID)
  currencyId: string;

  @Field()
  price: number;
}

@InputType()
export class UpdateBusinessProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  businessProduct?: string;

  @Field(() => ID, { nullable: true })
  currencyId?: string;

  @Field({ nullable: true })
  price: number;
}
