import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';
import { CommonProvince } from 'src/graphql/province.type';
import { CommonRegion } from 'src/graphql/region.type';

@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CommonProvince)
  province: CommonProvince;

  @Field()
  status: CityStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => CommonRegion)
  region: CommonRegion;
}

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field(() => ID)
  province: string;

  @Field()
  statusId: CityStatus;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  province?: string;

  @Field({ nullable: true })
  status?: CityStatus;
}
