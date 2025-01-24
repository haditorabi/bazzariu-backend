import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessBookingStatus } from '@prisma/client';

@ObjectType()
export class BusinessBooking {
  @Field(() => ID)
  id: string;

  @Field()
  maxAvilible: number;

  @Field()
  maxGuest: number;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  status: BusinessBookingStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
