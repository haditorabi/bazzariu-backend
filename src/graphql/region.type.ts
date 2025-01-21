import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Region {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  boundry: object;
}
