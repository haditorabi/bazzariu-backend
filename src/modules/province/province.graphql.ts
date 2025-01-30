import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { ProvinceStatus } from '@prisma/client';
import { CommonCity } from 'src/graphql/city.type';
import { CommonCountry } from 'src/graphql/country.type';

@ObjectType()
export class Province {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonCountry)
  country: CommonCountry;

  @Field()
  status: ProvinceStatus;

  @Field(() => [CommonCity])
  city?: CommonCity[];
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
  country?: string;

  @Field({ nullable: true })
  status?: ProvinceStatus;
}
