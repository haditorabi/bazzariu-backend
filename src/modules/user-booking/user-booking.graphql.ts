import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookingStatus } from '@prisma/client';
import { BookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserBooking {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => [String], { nullable: true })
  businessProductId?: string[];

  @Field(() => BookingTimeSlot)
  bookingTimeSlotId: BookingTimeSlot;

  @Field()
  status: UserBookingStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserBookingInput {
  @Field(() => ID)
  userId: string;

  @Field(() => [ID], { nullable: true })
  businessProductId?: string[];

  @Field(() => ID)
  bookingTimeSlotId: string;

  @Field()
  status: UserBookingStatus;
}

@InputType()
export class UpdateUserBookingInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => [ID], { nullable: true })
  businessProductId?: string[];

  @Field(() => ID, { nullable: true })
  bookingTimeSlotId?: string;

  @Field({ nullable: true })
  status?: UserBookingStatus;
}
