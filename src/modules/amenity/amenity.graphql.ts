import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(3, 50, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
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
