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
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => BusinessBoostType)
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

  @Field(() => BusinessBoostStatus)
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

  @Field(() => BusinessBoostType, { nullable: true })
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

  @Field(() => BusinessBoostStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessBoostStatus)
  status?: BusinessBoostStatus;
}
