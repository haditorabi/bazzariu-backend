import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  provinceId: string;

  @Field()
  status: CityStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => ID, { nullable: true })
  regionId?: string;
}

@InputType()
export class CreateCityInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  provinceId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(CityStatus)
  statusId: CityStatus;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  provinceId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(CityStatus)
  status?: CityStatus;
}
