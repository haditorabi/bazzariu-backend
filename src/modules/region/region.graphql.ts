import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { RegionStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CommonCity } from 'src/graphql/city.type';
import { CommonCountry } from 'src/graphql/country.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(RegionStatus, {
  name: 'RegionStatus',
});
@ObjectType()
export class Region {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonCountry)
  country?: CommonCountry;

  @Field(() => ID)
  countryId: string;

  @Field(() => CommonCity)
  city?: CommonCity;

  @Field(() => ID)
  cityId: string;

  @Field(() => RegionStatus)
  status: RegionStatus;

  @Field()
  boundry?: string;
}

@InputType()
export class CreateRegionInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  cityId: string;

  @Field(() => RegionStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(RegionStatus, { message: ValidationMessages.IS_ENUM })
  status: RegionStatus;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  boundry?: string;
}

@InputType()
export class UpdateRegionInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  boundry?: string;

  @Field(() => RegionStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(RegionStatus, { message: ValidationMessages.IS_ENUM })
  status?: RegionStatus;
}
