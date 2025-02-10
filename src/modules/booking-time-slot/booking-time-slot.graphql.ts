import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
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
registerEnumType(BookingTimeSlotStatus, {
  name: 'BookingTimeSlotStatus',
});
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

  @Field(() => BookingTimeSlotStatus)
  status: BookingTimeSlotStatus;
}

@InputType()
export class CreateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  businessBookingId?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  timezone: string;

  @Field(() => BookingTimeSlotStatus, { nullable: true })
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

  @Field(() => BookingTimeSlotStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BookingTimeSlotStatus)
  status?: BookingTimeSlotStatus;
}
