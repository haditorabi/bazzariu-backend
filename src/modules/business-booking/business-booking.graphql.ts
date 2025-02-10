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

  @Field(() => Int)
  maxAvailable: number;

  @Field(() => Int)
  maxGuest: number;

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
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessBookingStatus)
  @IsNotEmpty()
  @IsEnum(BusinessBookingStatus)
  status: BusinessBookingStatus;
}

@InputType()
export class UpdateBusinessBookingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  businessProductId?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  mediaId?: string[];

  @Field(() => BusinessBookingStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessBookingStatus)
  status?: BusinessBookingStatus;
}
