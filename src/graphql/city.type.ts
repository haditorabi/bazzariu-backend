import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CityStatus } from '@prisma/client';

@ObjectType()
export class CommonCity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  provinceId: string;

  @Field()
  status: CityStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
