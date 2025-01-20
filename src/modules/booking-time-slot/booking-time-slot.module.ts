import { Module } from '@nestjs/common';
import { BookingTimeSlotService } from './booking-time-slot.service';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookingTimeSlotService, BookingTimeSlotResolver],
})
export class BookingTimeSlotModule {}
