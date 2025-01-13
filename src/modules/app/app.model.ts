import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExampleModel {
  @Field(() => Int) // Integer type field
  id: number;

  @Field() // Default type is string
  name: string;

  @Field(() => String, { nullable: true }) // Nullable string field
  description?: string;
}

@InputType()
export class CreateExampleInput {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
