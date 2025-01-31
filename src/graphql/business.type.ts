import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
@ObjectType()
export class CommonBusiness {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;

  @Field()
  isClaimed: boolean;

  @Field(() => [ID], { nullable: true })
  amenityId?: string[];

  @Field(() => [ID], { nullable: true })
  businessCategoryId?: string[];

  @Field(() => [ID], { nullable: true })
  languageId?: string[];

  @Field(() => ID, { nullable: true })
  regionId?: string;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
