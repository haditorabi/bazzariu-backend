import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';
import { Province } from 'src/graphql/province.type';
import { Region } from 'src/graphql/Region.type';

@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Province)
  province: Province;

  @Field()
  status: CityStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Region)
  region: Region;
}

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field(() => ID)
  province: string;

  @Field()
  status: CityStatus;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => ID, { nullable: true })
  province: string;

  @Field({ nullable: true })
  status: CityStatus;
}
