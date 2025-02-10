import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  IsDecimal,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessLocationStatus, {
  name: 'BusinessLocationStatus',
});
@ObjectType()
export class BusinessLocation {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field(() => ID)
  countryId: string;

  @Field(() => ID)
  provinceId: string;

  @Field(() => ID)
  cityId: string;

  @Field()
  zipCode: string;

  @Field()
  phone: string;

  @Field(() => BusinessLocationStatus)
  status: BusinessLocationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessLocationInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(5, 330, { message: ValidationMessages.LENGTH })
  address?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  longitude?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsPhoneNumber(undefined, { message: ValidationMessages.IS_PHONE_NUMBER })
  phone?: string;

  @Field(() => BusinessLocationStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessLocationStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessLocationStatus;
}

@InputType()
export class UpdateBusinessLocationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(5, 330, { message: ValidationMessages.LENGTH })
  address?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDecimal({}, { message: ValidationMessages.IS_DECIMAL })
  longitude?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsPhoneNumber(undefined, { message: ValidationMessages.IS_PHONE_NUMBER })
  phone?: string;

  @Field(() => BusinessLocationStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessLocationStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessLocationStatus;
}
