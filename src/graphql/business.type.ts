import { Field, ID } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { Region } from './region.type';

export class Business {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  website: string;

  @Field()
  isClaimed: boolean;

  @Field(() => [ID])
  businessCategoryID: string[];

  @Field(() => [ID], { nullable: true })
  amenityId: string[];

  @Field(() => [ID], { nullable: true })
  languageId: string[];

  @Field(() => Region, { nullable: true })
  region: Region;

  @Field(() => [ID], { nullable: true })
  mediaId: string[];

  @Field()
  status: BusinessStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
