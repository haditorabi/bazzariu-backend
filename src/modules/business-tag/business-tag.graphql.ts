import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { BusinessTagStatus } from '@prisma/client';

@ObjectType()
export class BusinessTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: BusinessTagStatus;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateBusinessTagInput {
  @Field()
  name: string;

  @Field()
  status: BusinessTagStatus;
}

@InputType()
export class UpdateBusinessTagInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: BusinessTagStatus;
}
