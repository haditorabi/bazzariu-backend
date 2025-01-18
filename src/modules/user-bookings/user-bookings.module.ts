import { Module } from '@nestjs/common';
import { UserBookingsService } from './user-bookings.service';
import { UserBookingsResolver } from './user-bookings.resolver';

@Module({
  providers: [UserBookingsService, UserBookingsResolver]
})
export class UserBookingsModule {}
