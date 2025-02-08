import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, Length } from 'class-validator';

@ObjectType()
export class Amenity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateAmenityInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsMongoId()
  mediaId?: string;
}

@InputType()
export class UpdateAmenityInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;
}
