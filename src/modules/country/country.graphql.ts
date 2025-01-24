import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CountryStatus } from '@prisma/client';
import { Province } from 'src/graphql/province.type';
import { Region } from 'src/graphql/region.type';

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

  @Field(() => [Province], { nullable: true })
  province?: Province[];

  @Field(() => [Region], { nullable: true })
  region?: Region[];
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
