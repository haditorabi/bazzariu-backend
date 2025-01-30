import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BusinessHourStatus } from '@prisma/client';

@ObjectType()
export class CommonBusinessHour {
  @Field(() => ID)
  id: string;

  @Field()
  dayOfWeek: string;

  @Field()
  openTime: string;

  @Field()
  closeTime: string;

  @Field()
  status: BusinessHourStatus;
}
