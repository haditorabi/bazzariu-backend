import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessUpdateStatus, BusinessUpdateType } from '@prisma/client';
import {
  IsNotEmpty,
  IsMongoId,
  IsString,
  Length,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessUpdateType, {
  name: 'BusinessUpdateType',
});
registerEnumType(BusinessUpdateStatus, {
  name: 'BusinessUpdateStatus',
});
@ObjectType()
export class BusinessUpdate {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field()
  context: string;

  @Field(() => BusinessUpdateType)
  type: BusinessUpdateType;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => BusinessUpdateStatus)
  status: BusinessUpdateStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessUpdateInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(10, 70, { message: ValidationMessages.LENGTH })
  context: string;

  @Field(() => BusinessUpdateType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessUpdateType, { message: ValidationMessages.IS_ENUM })
  type: BusinessUpdateType;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startAt: Date;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endAt: Date;

  @Field(() => BusinessUpdateStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessUpdateStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessUpdateStatus;
}

@InputType()
export class UpdateBusinessUpdateInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(10, 70, { message: ValidationMessages.LENGTH })
  context?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessUpdateType, { message: ValidationMessages.IS_ENUM })
  type?: BusinessUpdateType;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  startAt?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsDate({ message: ValidationMessages.IS_DATE })
  endAt?: Date;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessUpdateStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessUpdateStatus;
}
