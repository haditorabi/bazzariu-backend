import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { ProvinceStatus } from '@prisma/client';
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

registerEnumType(ProvinceStatus, {
  name: 'ProvinceStatus',
});
@ObjectType()
export class Province {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonCountry, { nullable: true })
  country?: CommonCountry;

  @Field(() => ProvinceStatus)
  status: ProvinceStatus;

  @Field(() => [CommonCity], { nullable: true })
  city?: CommonCity[];
}

@InputType()
export class CreateProvinceInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId: string;

  @Field(() => ProvinceStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(ProvinceStatus, { message: ValidationMessages.IS_ENUM })
  status: ProvinceStatus;
}

@InputType()
export class UpdateProvinceInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  countryId?: string;

  @Field(() => ProvinceStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(ProvinceStatus, { message: ValidationMessages.IS_ENUM })
  status?: ProvinceStatus;
}
