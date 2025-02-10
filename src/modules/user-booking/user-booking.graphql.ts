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
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  bookingTimeSlotId: string;

  @Field(() => UserBookingStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(UserBookingStatus)
  status: UserBookingStatus;
}

@InputType()
export class UpdateUserBookingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  bookingTimeSlotId?: string;

  @Field(() => UserBookingStatus, { nullable: true })
  @IsOptional()
  @IsEnum(UserBookingStatus)
  status?: UserBookingStatus;
}
