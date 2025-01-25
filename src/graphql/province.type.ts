import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CommonProvince {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  countryId: string;
}
