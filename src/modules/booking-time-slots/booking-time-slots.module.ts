import { Module } from '@nestjs/common';
import { BookingTimeSlotsService } from './booking-time-slots.service';
import { BookingTimeSlotsResolver } from './booking-time-slots.resolver';

@Module({
  providers: [BookingTimeSlotsService, BookingTimeSlotsResolver]
})
export class BookingTimeSlotsModule {}
