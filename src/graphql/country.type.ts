import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Country {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;
}
