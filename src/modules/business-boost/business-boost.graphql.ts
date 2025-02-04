import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { BusinessBoostStatus, BusinessBoostType } from '@prisma/client';
import { IsDate } from 'class-validator';

@ObjectType()
export class BusinessBoost {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessBoostInput {
  @Field(() => ID)
  business: string;

  @Field()
  type: BusinessBoostType;

  @IsDate()
  @Field()
  startAt: Date;

  @IsDate()
  @Field()
  endAt: Date;

  @Field()
  status: BusinessBoostStatus;
}

@InputType()
export class UpdateBusinessBoostInput {
  @Field(() => ID, { nullable: true })
  business?: string;

  @Field({ nullable: true })
  type?: BusinessBoostType;

  @IsDate()
  @Field({ nullable: true })
  startAt?: Date;

  @IsDate()
  @Field({ nullable: true })
  endAt?: Date;

  @Field({ nullable: true })
  status?: BusinessBoostStatus;
}
