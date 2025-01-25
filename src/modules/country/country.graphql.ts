import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CountryStatus } from '@prisma/client';
import { CommonProvince } from 'src/graphql/province.type';
import { CommonRegion } from 'src/graphql/region.type';

@ObjectType()
export class Country {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  status: CountryStatus;

  @Field(() => [CommonProvince], { nullable: true })
  province?: CommonProvince[];

  @Field(() => [CommonRegion], { nullable: true })
  region?: CommonRegion[];
}

@InputType()
export class CreateCountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  status: CountryStatus;
}

@InputType()
export class UpdateCountryInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  status?: CountryStatus;
}
