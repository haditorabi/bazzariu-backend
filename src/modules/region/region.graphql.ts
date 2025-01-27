import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CountryStatus } from '@prisma/client';
import { CommonCity } from 'src/graphql/city.type';
import { CommonCountry } from 'src/graphql/country.type';

@ObjectType()
export class Region {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonCountry)
  country: CommonCountry;

  @Field(() => CommonCity)
  city: CommonCity;

  @Field(() => Boundry)
  boundry: Boundry;
}

@InputType()
export class CreateRegionInput {
  @Field()
  name: string;

  @Field(() => ID)
  country: string;

  @Field(() => ID)
  city: string;

  @Field(() => CountryStatus)
  status: CountryStatus;

  @Field(() => Boundry)
  boundry: Boundry;
}

@InputType()
export class UpdateRegionInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  country?: string;

  @Field(() => ID, { nullable: true })
  city?: string;

  @Field(() => Boundry, { nullable: true })
  boundry?: Boundry;
}
@ObjectType()
class Boundry {
  @Field()
  longtitude: string;

  @Field()
  latitude: string;
}
