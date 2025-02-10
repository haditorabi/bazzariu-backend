import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BookingTimeSlotStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsDate,
  IsString,
  Length,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';

@ObjectType()
export class BookingTimeSlot {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessBooking, { nullable: true })
  businessBooking?: CommonBusinessBooking;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field({ nullable: true })
  timezone?: string;

  @Field()
  status: BookingTimeSlotStatus;
}

@InputType()
export class CreateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  businessBookingId?: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  timezone: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(BookingTimeSlotStatus)
  status: BookingTimeSlotStatus;
}

@InputType()
export class UpdateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessBookingId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endAt?: Date;

  @Field({ nullable: true })
  @Length(3, 3)
  @IsOptional()
  timezone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BookingTimeSlotStatus)
  status?: BookingTimeSlotStatus;
}
