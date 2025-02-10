import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessHourStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';

@ObjectType()
export class BusinessHour {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field()
  dayOfWeek: string;

  @Field()
  openTime: string;

  @Field()
  closeTime: string;

  @Field()
  status: BusinessHourStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateBusinessHourInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  dayOfWeek: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  openTime: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  closeTime: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(BusinessHourStatus)
  status: BusinessHourStatus;
}

@InputType()
export class UpdateBusinessHourInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  dayOfWeek?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 5)
  openTime?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 5)
  closeTime?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessHourStatus)
  status?: BusinessHourStatus;
}
