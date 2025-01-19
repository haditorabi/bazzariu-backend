import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityResolver } from './amenity.resolver';

@Module({
  providers: [AmenityService, AmenityResolver],
})
export class AmenityModule {}
