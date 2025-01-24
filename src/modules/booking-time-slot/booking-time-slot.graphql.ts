import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BookingTimeSlotStatus } from '@prisma/client';
import { BusinessBooking } from './business-booking.type';

@ObjectType()
export class BookingTimeSlot {
  @Field(() => ID)
  id: string;

  @Field(() => BusinessBooking)
  businessBooking: BusinessBooking;

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
  @Field(() => ID)
  businessBookingId: string;

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
  @Field(() => ID)
  id: string;

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
