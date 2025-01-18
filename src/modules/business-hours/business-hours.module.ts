import { Module } from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { BusinessHoursResolver } from './business-hours.resolver';

@Module({
  providers: [BusinessHoursService, BusinessHoursResolver]
})
export class BusinessHoursModule {}
