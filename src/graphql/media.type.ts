import { Field, ObjectType, ID } from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';

@ObjectType()
export class CommonMedia {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  type: MediaType;

  @Field()
  moduleType: ModuleType;

  @Field()
  createdAt: Date;
}
