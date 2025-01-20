import { Module } from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { UserBookingResolver } from './user-booking.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserBookingService, UserBookingResolver],
})
export class UserBookingModule {}
