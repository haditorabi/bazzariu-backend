import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';

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
  name: string;

  @Field()
  status: ProductCategoryStatus;
}

@InputType()
export class UpdateProductCategoryInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: ProductCategoryStatus;
}
