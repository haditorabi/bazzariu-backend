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
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BookingTimeSlotStatus, {
  name: 'BookingTimeSlotStatus',
});
@ObjectType()
export class BookingTimeSlot {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusinessBooking, { nullable: true })
  businessBooking?: CommonBusinessBooking;

  @Field(() => ID, { nullable: true })
  businessBookingId?: string;

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessBookingId?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startAt: Date;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endAt: Date;

  @Field({ nullable: true })
  @IsString({ message: ValidationMessages.IS_STRING })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  timezone: string;

  @Field(() => BookingTimeSlotStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BookingTimeSlotStatus, { message: ValidationMessages.IS_ENUM })
  status: BookingTimeSlotStatus;
}

@InputType()
export class UpdateBookingTimeSlotInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessBookingId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startAt?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endAt?: Date;

  @Field({ nullable: true })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  timezone?: string;

  @Field(() => BookingTimeSlotStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BookingTimeSlotStatus, { message: ValidationMessages.IS_ENUM })
  status?: BookingTimeSlotStatus;
}
