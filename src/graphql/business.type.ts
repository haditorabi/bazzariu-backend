import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { CommonRegion } from './region.type';
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
  businessCategory?: string[];

  @Field(() => [ID], { nullable: true })
  amenity?: string[];

  @Field(() => [ID], { nullable: true })
  language?: string[];

  @Field(() => CommonRegion, { nullable: true })
  region?: CommonRegion;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
