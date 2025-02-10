import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { BusinessBoostStatus, BusinessBoostType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class BusinessBoost {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field({ nullable: true })
  type?: BusinessBoostType;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  status: BusinessBoostStatus;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessBoostInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(BusinessBoostType)
  type: BusinessBoostType;

  @Field()
  @IsDate()
  @IsNotEmpty()
  startAt: Date;

  @Field()
  @IsDate()
  @IsNotEmpty()
  endAt: Date;

  @Field()
  @IsNotEmpty()
  @IsEnum(BusinessBoostStatus)
  status: BusinessBoostStatus;
}

@InputType()
export class UpdateBusinessBoostInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessBoostType)
  type?: BusinessBoostType;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  startAt?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  endAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessBoostStatus)
  status?: BusinessBoostStatus;
}
