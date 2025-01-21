import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Province {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
