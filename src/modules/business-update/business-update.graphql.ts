import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessUpdateStatus, BusinessUpdateType } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

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

  @Field()
  type: BusinessUpdateType;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  status: BusinessUpdateStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessUpdateInput {
  @Field(() => ID)
  business: string;

  @Field()
  context: string;

  @Field()
  type: BusinessUpdateType;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  status: BusinessUpdateStatus;
}

@InputType()
export class UpdateBusinessUpdateInput {
  @Field(() => ID, { nullable: true })
  business?: string;

  @Field({ nullable: true })
  context?: string;

  @Field({ nullable: true })
  type?: BusinessUpdateType;

  @Field({ nullable: true })
  startAt?: Date;

  @Field({ nullable: true })
  endAt?: Date;

  @Field({ nullable: true })
  status?: BusinessUpdateStatus;
}
