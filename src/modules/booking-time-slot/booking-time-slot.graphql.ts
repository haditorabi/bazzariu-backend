import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BookingTimeSlotStatus } from '@prisma/client';
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

  @Field()
  timezone: string;

  @Field()
  status: BookingTimeSlotStatus;
}

@InputType()
export class CreateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  businessBookingId?: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  timezone: string;

  @Field()
  status: BookingTimeSlotStatus;
}

@InputType()
export class UpdateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  businessBookingId?: string;

  @Field({ nullable: true })
  startAt?: Date;

  @Field({ nullable: true })
  endAt?: Date;

  @Field({ nullable: true })
  timezone?: string;

  @Field({ nullable: true })
  status?: BookingTimeSlotStatus;
}
