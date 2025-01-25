import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BookingTimeSlotStatus } from '@prisma/client';

@ObjectType()
export class CommonBookingTimeSlot {
  @Field(() => ID)
  id: string;

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
