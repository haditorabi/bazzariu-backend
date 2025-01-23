import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessCategoryStatus } from '@prisma/client';

@ObjectType()
export class BusinessCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  mediaId?: string;

  @Field()
  status: BusinessCategoryStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateBusinessCategoryInput {
  @Field()
  name: string;

  @Field(() => ID)
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
