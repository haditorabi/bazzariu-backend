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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => EventCategoryStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(EventCategoryStatus, { message: ValidationMessages.IS_ENUM })
  status: EventCategoryStatus;
}

@InputType()
export class UpdateEventCategoryInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => EventCategoryStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(EventCategoryStatus, { message: ValidationMessages.IS_ENUM })
  status?: EventCategoryStatus;
}
