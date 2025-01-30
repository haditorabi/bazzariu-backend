import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma/client';
@ObjectType()
export class CommonProductCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: ProductCategoryStatus;
}
