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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessProductId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  currencyId: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  @Min(1, { message: ValidationMessages.MIN })
  price: number;
}

@InputType()
export class UpdateBusinessProductPriceInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  currencyId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  @Min(1, { message: ValidationMessages.MIN })
  price?: number;
}
