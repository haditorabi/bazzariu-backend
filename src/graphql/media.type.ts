import { Field, ObjectType, ID } from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';

@ObjectType()
export class Media {
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
