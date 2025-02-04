import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { BusinessBookingStatus } from '@prisma/client';
import { BookingTimeSlot } from '../booking-time-slot/booking-time-slot.graphql';

@ObjectType()
export class BusinessBooking {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => [CommonBusinessProduct], { nullable: true })
  businessProduct?: CommonBusinessProduct[];

  @Field(() => [ID])
  businessProductId: string[];

  @Field(() => Int)
  maxAvailable: number;

  @Field(() => Int)
  maxGuest: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => [BookingTimeSlot], { nullable: true })
  bookingTimeSlot?: BookingTimeSlot[];

  @Field()
  status: BusinessBookingStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessBookingInput {
  @Field(() => ID)
  business: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field(() => Int, { nullable: true })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessBookingStatus;
}

@InputType()
export class UpdateBusinessBookingInput {
  @Field(() => ID, { nullable: true })
  business?: string;

  @Field(() => [ID], { nullable: true })
  businessProduct?: string[];

  @Field(() => Int, { nullable: true })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  status?: BusinessBookingStatus;
}
