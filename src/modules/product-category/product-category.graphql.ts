import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
registerEnumType(ProductCategoryStatus, {
  name: 'ProductCategoryStatus',
});
@ObjectType()
export class ProductCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateProductCategoryInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => ProductCategoryStatus, { nullable: true })
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

  @Field(() => ProductCategoryStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ProductCategoryStatus)
  status?: ProductCategoryStatus;
}
