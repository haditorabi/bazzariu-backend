import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';

@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  provinceId: string;

  @Field()
  status: CityStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => ID, { nullable: true })
  regionId?: string;
}

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field(() => ID)
  provinceId: string;

  @Field()
  statusId: CityStatus;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  provinceId?: string;

  @Field({ nullable: true })
  status?: CityStatus;
}
