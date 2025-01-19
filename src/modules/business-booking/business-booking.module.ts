import { Module } from '@nestjs/common';
import { BusinessBookingService } from './business-booking.service';
import { BusinessBookingResolver } from './business-booking.resolver';

@Module({
  providers: [BusinessBookingService, BusinessBookingResolver],
})
export class BusinessBookingModule {}
