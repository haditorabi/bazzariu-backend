import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { RegionStatus } from '@prisma/client';
import { CommonCity } from 'src/graphql/city.type';
import { CommonCountry } from 'src/graphql/country.type';

registerEnumType(RegionStatus, {
  name: 'RegionStatus',
  description: 'The status of the region',
});
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

  @Field(() => RegionStatus)
  status: RegionStatus;

  @Field()
  boundry?: string;
}

@InputType()
export class CreateRegionInput {
  @Field()
  name: string;

  @Field(() => ID)
  country: string;

  @Field(() => ID)
  city: string;

  @Field(() => RegionStatus)
  status: RegionStatus;

  @Field()
  boundry?: string;
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

  @Field({ nullable: true })
  boundry?: string;

  @Field(() => RegionStatus, { nullable: true })
  status?: RegionStatus;
}
