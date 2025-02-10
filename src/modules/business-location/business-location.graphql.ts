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
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 330)
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 30)
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @Field(() => BusinessLocationStatus, { nullable: true })
  @IsNotEmpty()
  @IsEnum(BusinessLocationStatus)
  status: BusinessLocationStatus;
}

@InputType()
export class UpdateBusinessLocationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 330)
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  cityId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 30)
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @Field(() => BusinessLocationStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessLocationStatus)
  status?: BusinessLocationStatus;
}
