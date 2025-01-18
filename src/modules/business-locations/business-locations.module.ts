import { Module } from '@nestjs/common';
import { BusinessLocationsService } from './business-locations.service';
import { BusinessLocationsResolver } from './business-locations.resolver';

@Module({
  providers: [BusinessLocationsService, BusinessLocationsResolver]
})
export class BusinessLocationsModule {}
