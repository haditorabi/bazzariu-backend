import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class Amenity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  mediaId: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateAmenityInput {
  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;
}

@InputType()
export class UpdateAmenityInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;
}
