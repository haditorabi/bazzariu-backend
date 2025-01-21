import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessProductStatus } from '@prisma/client';

@ObjectType()
export class BusinessProduct {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ID])
  mediaId: string[];

  @Field()
  status: BusinessProductStatus;
}
