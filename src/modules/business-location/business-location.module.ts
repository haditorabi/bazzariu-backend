import { Module } from '@nestjs/common';
import { BusinessLocationService } from './business-location.service';
import { BusinessLocationResolver } from './business-location.resolver';

@Module({
  providers: [BusinessLocationService, BusinessLocationResolver],
})
export class BusinessLocationModule {}
