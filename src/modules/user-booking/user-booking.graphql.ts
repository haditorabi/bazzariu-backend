import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { UserBookingStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { CommonBookingTimeSlot } from 'src/graphql/booking-time-slot.type';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(UserBookingStatus, {
  name: 'UserBookingStatus',
});
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

  @Field(() => UserBookingStatus)
  status: UserBookingStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateUserBookingInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  bookingTimeSlotId: string;

  @Field(() => UserBookingStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(UserBookingStatus, { message: ValidationMessages.IS_ENUM })
  status: UserBookingStatus;
}

@InputType()
export class UpdateUserBookingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  userId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  bookingTimeSlotId?: string;

  @Field(() => UserBookingStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(UserBookingStatus, { message: ValidationMessages.IS_ENUM })
  status?: UserBookingStatus;
}
