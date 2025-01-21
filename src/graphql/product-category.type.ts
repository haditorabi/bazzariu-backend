import { Field, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';

export class ProductCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: ProductCategoryStatus;
}
