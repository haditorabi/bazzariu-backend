import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessCategoryStatus } from '@prisma/client';
import { IsDate, IsOptional } from 'class-validator';

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

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}

@InputType()
export class CreateBusinessCategoryInput {
  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field()
  status: BusinessCategoryStatus;
}

@InputType()
export class UpdateBusinessCategoryInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field({ nullable: true })
  status?: BusinessCategoryStatus;

  @Field({ nullable: true })
  deletedAt?: Date;
}
