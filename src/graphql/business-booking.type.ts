import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { BusinessBookingStatus } from '@prisma/client';

@ObjectType()
export class CommonBusinessBooking {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  maxAvailable?: number;

  @Field(() => Int, { nullable: true })
  maxGuest?: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessBookingStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
