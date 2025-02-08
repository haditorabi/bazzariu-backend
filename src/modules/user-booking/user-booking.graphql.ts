import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookingStatus } from '@prisma/client';
import { CommonBookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBooking {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => [String], { nullable: true })
  businessProductId?: string[];

  @Field(() => CommonBookingTimeSlot, { nullable: true })
  bookingTimeSlot?: CommonBookingTimeSlot;

  @Field(() => ID)
  bookingTimeSlotId: string;

  @Field()
  status: UserBookingStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
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
