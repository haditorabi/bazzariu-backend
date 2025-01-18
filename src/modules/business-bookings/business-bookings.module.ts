import { Module } from '@nestjs/common';
import { BusinessBookingsService } from './business-bookings.service';
import { BusinessBookingsResolver } from './business-bookings.resolver';

@Module({
  providers: [BusinessBookingsService, BusinessBookingsResolver]
})
export class BusinessBookingsModule {}
