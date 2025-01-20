import { Module } from '@nestjs/common';
import { BusinessHourService } from './business-hour.service';
import { BusinessHourResolver } from './business-hour.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessHourService, BusinessHourResolver],
})
export class BusinessHourModule {}
