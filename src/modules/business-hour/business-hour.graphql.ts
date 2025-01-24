import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessHourStatus } from '@prisma/client';
import { Business } from 'src/graphql/business.type';

@ObjectType()
export class BusinessHour {
  @Field(() => ID)
  id: string;

  @Field(() => Business)
  business: Business;

  @Field()
  dayOfWeek: string;

  @Field()
  openTime: string;

  @Field()
  closeTime: string;

  @Field()
  status: BusinessHourStatus;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateBusinessHourInput {
  @Field(() => ID)
  business: string;

  @Field()
  dayOfWeek: string;

  @Field()
  openTime: string;

  @Field()
  closeTime: string;

  @Field()
  status: BusinessHourStatus;
}

@InputType()
export class UpdateBusinessHourInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  business?: string;

  @Field({ nullable: true })
  dayOfWeek?: string;

  @Field({ nullable: true })
  openTime?: string;

  @Field({ nullable: true })
  closeTime?: string;

  @Field({ nullable: true })
  status?: BusinessHourStatus;
}
