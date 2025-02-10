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
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  code: string;

  @Field(() => CountryStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(CountryStatus)
  status: CountryStatus;
}

@InputType()
export class UpdateCountryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  code?: string;

  @Field(() => CountryStatus, { nullable: true })
  @IsOptional()
  @IsEnum(CountryStatus)
  status?: CountryStatus;
}
