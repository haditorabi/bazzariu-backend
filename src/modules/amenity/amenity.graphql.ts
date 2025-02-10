import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, Length } from 'class-validator';

@ObjectType()
export class Amenity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateAmenityInput {
  @Field()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;
}

@InputType()
export class UpdateAmenityInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;
}
