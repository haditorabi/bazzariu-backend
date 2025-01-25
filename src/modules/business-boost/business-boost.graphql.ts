import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CommonBusiness } from 'src/graphql/business.type';
import { BusinessBoostStatus, BusinessBoostType } from '@prisma/client';

@ObjectType()
export class BusinessBoost {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness)
  business: CommonBusiness;

  @Field()
  type: BusinessBoostType;

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

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  status: BusinessBoostStatus;
}

@InputType()
export class UpdateBusinessBoostInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field({ nullable: true })
  type?: BusinessBoostType;

  @Field({ nullable: true })
  startAt?: Date;

  @Field({ nullable: true })
  endAt?: Date;

  @Field({ nullable: true })
  status?: BusinessBoostStatus;
}
