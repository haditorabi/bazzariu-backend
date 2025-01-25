import { Field, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';

export class CommonProductCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: ProductCategoryStatus;
}
