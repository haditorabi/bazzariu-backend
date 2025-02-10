import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { EventCategoryStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';
import { CommonEvent } from 'src/graphql/event.type';
registerEnumType(EventCategoryStatus, {
  name: 'EventCategoryStatus',
});
@ObjectType()
export class EventCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => EventCategoryStatus)
  status: EventCategoryStatus;

  @Field(() => [ID], { nullable: true })
  eventId?: string[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => [CommonEvent], { nullable: true })
  event?: CommonEvent[];
}

@InputType()
export class CreateEventCategoryInput {
  @Field()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @Field(() => EventCategoryStatus)
  @IsNotEmpty()
  @IsEnum(EventCategoryStatus)
  status: EventCategoryStatus;
}

@InputType()
export class UpdateEventCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @Field(() => EventCategoryStatus, { nullable: true })
  @IsOptional()
  @IsEnum(EventCategoryStatus)
  status?: EventCategoryStatus;
}
