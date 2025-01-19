import { Module } from '@nestjs/common';
import { BookingTimeSlotService } from './booking-time-slot.service';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';

@Module({
  providers: [BookingTimeSlotService, BookingTimeSlotResolver],
})
export class BookingTimeSlotModule {}
