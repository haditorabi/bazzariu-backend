import {
  Field,
  ObjectType,
  InputType,
  ID,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { BusinessBookingStatus } from '@prisma/client';
import { BookingTimeSlot } from '../booking-time-slot/booking-time-slot.graphql';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessBookingStatus, {
  name: 'BusinessBookingStatus',
});
@ObjectType()
export class BusinessBooking {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => [CommonBusinessProduct], { nullable: true })
  businessProduct?: CommonBusinessProduct[];

  @Field(() => [ID])
  businessProductId: string[];

  @Field(() => Int, { nullable: true })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => [BookingTimeSlot], { nullable: true })
  bookingTimeSlot?: BookingTimeSlot[];

  @Field(() => BusinessBookingStatus)
  status: BusinessBookingStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessBookingInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessBookingStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessBookingStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessBookingStatus;
}

@InputType()
export class UpdateBusinessBookingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  businessProductId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsInt({ message: ValidationMessages.IS_INT })
  @Min(1, { message: ValidationMessages.MIN })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @IsMongoId({ each: true, message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string[];

  @Field(() => BusinessBookingStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessBookingStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessBookingStatus;
}
