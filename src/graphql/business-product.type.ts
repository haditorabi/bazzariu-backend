import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';

@ObjectType()
export class BusinessProduct {
  @Field(() => ID)
  id: string;

  @Field()
  businessId: string;

  @Field()
  categoryId?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessProductStatus;
}
