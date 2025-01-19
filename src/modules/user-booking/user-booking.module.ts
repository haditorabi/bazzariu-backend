import { Module } from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { UserBookingResolver } from './user-booking.resolver';

@Module({
  providers: [UserBookingService, UserBookingResolver],
})
export class UserBookingModule {}
