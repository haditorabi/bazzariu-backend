import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { EventCategoryStatus } from '@prisma/client';
import { Event } from 'src/graphql/event.type';

@ObjectType()
export class EventCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: EventCategoryStatus;

  @Field()
  createdAt: Date;

  @Field(() => [Event], { nullable: true })
  event?: Event[];
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
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: EventCategoryStatus;
}
