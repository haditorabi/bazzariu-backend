import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsDate,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { CommonEventCategory } from 'src/graphql/event-category.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(EventStatus, {
  name: 'EventStatus',
});
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

  @Field(() => [CommonEventCategory], { nullable: true })
  category?: CommonEventCategory[];

  @Field(() => [ID], { nullable: true })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => EventStatus)
  status: EventStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateEventInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(10, 300, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startDate: Date;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => EventStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(EventStatus, { message: ValidationMessages.IS_ENUM })
  status: EventStatus;
}

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(10, 300, { message: ValidationMessages.LENGTH })
  description?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => EventStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(EventStatus, { message: ValidationMessages.IS_ENUM })
  status?: EventStatus;
}
