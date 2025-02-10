import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
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

@ObjectType()
export class Province {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonCountry, { nullable: true })
  country?: CommonCountry;

  @Field()
  status: ProvinceStatus;

  @Field(() => [CommonCity], { nullable: true })
  city?: CommonCity[];
}

@InputType()
export class CreateProvinceInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  countryId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(ProvinceStatus)
  status: ProvinceStatus;
}

@InputType()
export class UpdateProvinceInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(ProvinceStatus)
  status?: ProvinceStatus;
}
