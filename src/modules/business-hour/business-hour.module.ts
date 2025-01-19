import { Module } from '@nestjs/common';
import { BusinessHourService } from './business-hour.service';
import { BusinessHourResolver } from './business-hour.resolver';

@Module({
  providers: [BusinessHourService, BusinessHourResolver],
})
export class BusinessHourModule {}
