import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class ProductCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: ProductCategoryStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateProductCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(ProductCategoryStatus)
  status: ProductCategoryStatus;
}

@InputType()
export class UpdateProductCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(ProductCategoryStatus)
  status?: ProductCategoryStatus;
}
