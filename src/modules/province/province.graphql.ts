import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { ProvinceStatus } from '@prisma/client';
import { City } from 'src/graphql/city.type';
import { Country } from 'src/graphql/country.type';

@ObjectType()
export class Province {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Country)
  country: Country;

  @Field()
  status: ProvinceStatus;

  @Field(() => City)
  city: City;
}

@InputType()
export class CreateProvinceInput {
  @Field()
  name: string;

  @Field(() => ID)
  country: string;

  @Field()
  status: ProvinceStatus;
}

@InputType()
export class UpdateProvinceInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  country: string;

  @Field({ nullable: true })
  status: ProvinceStatus;
}
