import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessLocationStatus } from '@prisma/client';
import { Business } from 'src/graphql/business.type';

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

  @Field(() => ID)
  countryID: string;

  @Field(() => ID)
  provinceID: string;

  @Field(() => ID)
  cityID: string;

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
  @Field(() => Business)
  business: Business;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field(() => ID)
  countryID: string;

  @Field(() => ID)
  provinceID: string;

  @Field(() => ID)
  cityID: string;

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
  business: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  latitude?: string;

  @Field({ nullable: true })
  longitude?: string;

  @Field(() => ID, { nullable: true })
  countryID?: string;

  @Field(() => ID, { nullable: true })
  provinceID?: string;

  @Field(() => ID, { nullable: true })
  cityID?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: BusinessLocationStatus;
}
