import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { EventCategoryStatus } from '@prisma/client';
import { CommonEvent } from 'src/graphql/event.type';

@ObjectType()
export class EventCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: EventCategoryStatus;

  @Field(() => [ID])
  eventId: string[];

  @Field()
  createdAt: Date;

  @Field(() => [CommonEvent], { nullable: true })
  event?: CommonEvent[];
}

@InputType()
export class CreateEventCategoryInput {
  @Field()
  name: string;

  @Field()
  status: EventCategoryStatus;
}

@InputType()
export class UpdateEventCategoryInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: EventCategoryStatus;
}
