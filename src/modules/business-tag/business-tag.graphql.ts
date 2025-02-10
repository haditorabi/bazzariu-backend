import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessTagStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class BusinessTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: BusinessTagStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateBusinessTagInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(BusinessTagStatus)
  status: BusinessTagStatus;
}

@InputType()
export class UpdateBusinessTagInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BusinessTagStatus)
  status?: BusinessTagStatus;
}
