import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { BusinessBoostStatus, BusinessBoostType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessBoostType, {
  name: 'BusinessBoostType',
});
registerEnumType(BusinessBoostStatus, {
  name: 'BusinessBoostStatus',
});
@ObjectType()
export class BusinessBoost {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => BusinessBoostType, { nullable: true })
  type?: BusinessBoostType;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => BusinessBoostStatus)
  status: BusinessBoostStatus;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessBoostInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field(() => BusinessBoostType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessBoostType, { message: ValidationMessages.IS_ENUM })
  type: BusinessBoostType;

  @Field({ nullable: true })
  @IsDate({ message: ValidationMessages.IS_DATE })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  startAt: Date;

  @Field({ nullable: true })
  @IsDate({ message: ValidationMessages.IS_DATE })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  endAt: Date;

  @Field(() => BusinessBoostStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessBoostStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessBoostStatus;
}

@InputType()
export class UpdateBusinessBoostInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field(() => BusinessBoostType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessBoostType, { message: ValidationMessages.IS_ENUM })
  type?: BusinessBoostType;

  @Field({ nullable: true })
  @IsDate({ message: ValidationMessages.IS_DATE })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  startAt?: Date;

  @Field({ nullable: true })
  @IsDate({ message: ValidationMessages.IS_DATE })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  endAt?: Date;

  @Field(() => BusinessBoostStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessBoostStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessBoostStatus;
}
