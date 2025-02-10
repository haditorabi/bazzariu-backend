import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { Currency } from '../currency/currency.graphql';
import {
  IsNotEmpty,
  IsMongoId,
  IsDecimal,
  Min,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class BusinessProductPrice {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessProduct, { nullable: true })
  businessProduct?: CommonBusinessProduct;

  @Field(() => ID)
  businessProductId: string;

  @Field(() => Currency, { nullable: true })
  currency?: Currency;

  @Field(() => ID, { nullable: true })
  currencyId?: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessProductPriceInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  businessProductId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDecimal()
  @Min(1)
  price: number;
}

@InputType()
export class UpdateBusinessProductPriceInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessProductId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  currencyId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  @Min(1)
  price?: number;
}
