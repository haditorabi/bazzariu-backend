import { Field, ObjectType, ID } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';

@ObjectType()
export class CommonEvent {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [ID])
  categoryId: string[];

  @Field()
  status: EventStatus;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
