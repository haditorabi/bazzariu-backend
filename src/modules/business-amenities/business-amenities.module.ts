import { Module } from '@nestjs/common';
import { BusinessAmenitiesService } from './business-amenities.service';
import { BusinessAmenitiesResolver } from './business-amenities.resolver';

@Module({
  providers: [BusinessAmenitiesService, BusinessAmenitiesResolver]
})
export class BusinessAmenitiesModule {}
