import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserBookingStatus } from '@prisma/client';
import { CommonBookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserBooking {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => [String], { nullable: true })
  businessProductId?: string[];

  @Field(() => CommonBookingTimeSlot)
  bookingTimeSlot: CommonBookingTimeSlot;

  @Field(() => ID)
  bookingTimeSlotId: string;

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
  user: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field(() => ID)
  bookingTimeSlot: string;

  @Field()
  status: UserBookingStatus;
}

@InputType()
export class UpdateUserBookingInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field(() => ID, { nullable: true })
  bookingTimeSlot?: string;

  @Field({ nullable: true })
  status?: UserBookingStatus;
}
