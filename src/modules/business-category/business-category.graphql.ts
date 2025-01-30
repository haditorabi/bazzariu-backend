import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessCategoryStatus } from '@prisma/client';
import { IsDate } from 'class-validator';

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
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field({ nullable: true })
  status?: BusinessCategoryStatus;
}
