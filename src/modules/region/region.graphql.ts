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
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  countryId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  cityId: string;

  @Field(() => RegionStatus)
  @IsNotEmpty()
  @IsEnum(RegionStatus)
  status: RegionStatus;

  @Field()
  @IsNotEmpty()
  @IsString()
  boundry?: string;
}

@InputType()
export class UpdateRegionInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  boundry?: string;

  @Field(() => RegionStatus, { nullable: true })
  @IsOptional()
  @IsEnum(RegionStatus)
  status?: RegionStatus;
}
