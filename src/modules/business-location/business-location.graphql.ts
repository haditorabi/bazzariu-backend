import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

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

  @Field()
  status: BusinessLocationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessLocationInput {
  @Field(() => ID)
  business: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;

  @Field(() => ID, { nullable: true })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  cityId?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  status: BusinessLocationStatus;
}

@InputType()
export class UpdateBusinessLocationInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  business: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;

  @Field(() => ID, { nullable: true })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  provinceId?: string;

  @Field(() => ID, { nullable: true })
  cityId?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: BusinessLocationStatus;
}
