import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';

@ObjectType()
export class CommonBusinessProduct {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  business: string;

  @Field(() => ID)
  category?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessProductStatus;
}
