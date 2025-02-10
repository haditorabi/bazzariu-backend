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
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(10, 70)
  context: string;

  @Field(() => BusinessUpdateType)
  @IsNotEmpty()
  @IsEnum(BusinessUpdateType)
  type: BusinessUpdateType;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @Field(() => BusinessUpdateStatus)
  @IsNotEmpty()
  @IsEnum(BusinessUpdateStatus)
  status: BusinessUpdateStatus;
}

@InputType()
export class UpdateBusinessUpdateInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(10, 70)
  context?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessUpdateType)
  type?: BusinessUpdateType;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessUpdateStatus)
  status?: BusinessUpdateStatus;
}
