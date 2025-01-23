import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { City } from 'src/graphql/city.type';
import { Country } from 'src/graphql/country.type';

@ObjectType()
export class Region {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Country)
  country: Country;

  @Field(() => City)
  city: City;

  @Field()
  boundry: object;
}

@InputType()
export class CreateRegionInput {
  @Field()
  name: string;

  @Field(() => ID)
  countryId: string;

  @Field(() => ID)
  cityId: string;

  @Field()
  boundry: object;
}

@InputType()
export class UpdateRegionInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  countryId?: string;

  @Field(() => ID, { nullable: true })
  cityId?: string;

  @Field({ nullable: true })
  boundry?: object;
}
