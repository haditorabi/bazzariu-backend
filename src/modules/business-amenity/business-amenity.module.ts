import { Module } from '@nestjs/common';
import { BusinessAmenityService } from './business-amenity.service';
import { BusinessAmenityResolver } from './business-amenity.resolver';

@Module({
  providers: [BusinessAmenityService, BusinessAmenityResolver],
})
export class BusinessAmenityModule {}
