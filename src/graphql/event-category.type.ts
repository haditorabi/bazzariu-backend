import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EventCategoryStatus } from '@prisma/client';

@ObjectType()
export class EventCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: EventCategoryStatus;
}
