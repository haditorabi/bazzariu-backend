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
  businessId: string;

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
}

@InputType()
export class UpdateBusinessLocationInput {
  @Field(() => ID, { nullable: true })
  businessId: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  latitude?: string;

  @Field({ nullable: true })
  longitude?: string;

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
