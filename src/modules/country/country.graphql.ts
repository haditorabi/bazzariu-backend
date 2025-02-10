import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { CountryStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CommonProvince } from 'src/graphql/province.type';
import { CommonRegion } from 'src/graphql/region.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(CountryStatus, {
  name: 'CountryStatus',
});
@ObjectType()
export class Country {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => CountryStatus)
  status: CountryStatus;

  @Field(() => [CommonProvince], { nullable: true })
  province?: CommonProvince[];

  @Field(() => [CommonRegion], { nullable: true })
  region?: CommonRegion[];
}

@InputType()
export class CreateCountryInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  code: string;

  @Field(() => CountryStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(CountryStatus, { message: ValidationMessages.IS_ENUM })
  status: CountryStatus;
}

@InputType()
export class UpdateCountryInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  code?: string;

  @Field(() => CountryStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(CountryStatus, { message: ValidationMessages.IS_ENUM })
  status?: CountryStatus;
}
