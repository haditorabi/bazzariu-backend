import { Module } from '@nestjs/common';
import { BusinessBookingService } from './business-booking.service';
import { BusinessBookingResolver } from './business-booking.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessBookingService, BusinessBookingResolver],
})
export class BusinessBookingModule {}
