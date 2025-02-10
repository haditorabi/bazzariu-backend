import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
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

  @Field()
  status: EventStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 300)
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsMongoId({ each: true })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field()
  @IsNotEmpty()
  @IsEnum(EventStatus)
  status: EventStatus;
}

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 300)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsMongoId({ each: true })
  categoryId?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
