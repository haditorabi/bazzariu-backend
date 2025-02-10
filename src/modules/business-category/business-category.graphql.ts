import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessCategoryStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@ObjectType()
export class BusinessCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field()
  status: BusinessCategoryStatus;

  @Field({ nullable: true })
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsDate()
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(BusinessCategoryStatus)
  status: BusinessCategoryStatus;
}

@InputType()
export class UpdateBusinessCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;

  @Field({ nullable: true })
  @IsEnum(BusinessCategoryStatus)
  @IsOptional()
  status?: BusinessCategoryStatus;
}
