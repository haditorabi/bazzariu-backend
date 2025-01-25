import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { EventCategory } from 'src/graphql/event-category.type';

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

  @Field(() => [EventCategory], { nullable: true })
  category?: EventCategory[];

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: EventStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateEventInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  categoryId: string[];

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: EventStatus;
}

@InputType()
export class UpdateEventInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: EventStatus;
}
