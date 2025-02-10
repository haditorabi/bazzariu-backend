import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { EventCategoryStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';
import { CommonEvent } from 'src/graphql/event.type';

@ObjectType()
export class EventCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
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

  @Field()
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(EventCategoryStatus)
  status?: EventCategoryStatus;
}
