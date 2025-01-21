import { Field, ObjectType, ID } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  status: EventStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
