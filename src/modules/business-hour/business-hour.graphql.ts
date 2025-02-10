import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
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
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessHourStatus, {
  name: 'BusinessHourStatus',
});
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

  @Field(() => BusinessHourStatus)
  status: BusinessHourStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateBusinessHourInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  dayOfWeek: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 5, { message: ValidationMessages.LENGTH })
  openTime: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 5, { message: ValidationMessages.LENGTH })
  closeTime: string;

  @Field(() => BusinessHourStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessHourStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessHourStatus;
}

@InputType()
export class UpdateBusinessHourInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  dayOfWeek?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 5, { message: ValidationMessages.LENGTH })
  openTime?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 5, { message: ValidationMessages.LENGTH })
  closeTime?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessHourStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessHourStatus;
}
