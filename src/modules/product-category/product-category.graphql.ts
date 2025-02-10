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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ProductCategoryStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(ProductCategoryStatus, { message: ValidationMessages.IS_ENUM })
  status: ProductCategoryStatus;
}

@InputType()
export class UpdateProductCategoryInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => ProductCategoryStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(ProductCategoryStatus, { message: ValidationMessages.IS_ENUM })
  status?: ProductCategoryStatus;
}
