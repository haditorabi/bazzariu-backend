import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';
registerEnumType(CityStatus, {
  name: 'CityStatus',
});
@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  provinceId: string;

  @Field(() => CityStatus)
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
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  provinceId: string;

  @Field(() => CityStatus, { nullable: true })
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

  @Field(() => CityStatus, { nullable: true })
  @IsOptional()
  @IsEnum(CityStatus)
  status?: CityStatus;
}
