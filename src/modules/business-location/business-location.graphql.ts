import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';
import { Business } from 'src/graphql/business.type';
import { City } from 'src/graphql/city.type';
import { Country } from 'src/graphql/country.type';
import { Province } from 'src/graphql/province.type';

@ObjectType()
export class BusinessLocation {
  @Field(() => ID)
  id: string;

  @Field(() => Business)
  business: Business;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field(() => Country)
  country: Country;

  @Field(() => Province)
  provinceId: string;

  @Field(() => City)
  cityID: City;

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
  country?: string;

  @Field(() => ID, { nullable: true })
  province?: string;

  @Field(() => ID, { nullable: true })
  city?: string;

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
  country?: string;

  @Field(() => ID, { nullable: true })
  province?: string;

  @Field(() => ID, { nullable: true })
  city?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: BusinessLocationStatus;
}
