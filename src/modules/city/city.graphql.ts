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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  provinceId: string;

  @Field(() => CityStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(CityStatus, { message: ValidationMessages.IS_ENUM })
  statusId: CityStatus;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  provinceId?: string;

  @Field(() => CityStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(CityStatus, { message: ValidationMessages.IS_ENUM })
  status?: CityStatus;
}
